from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from packaging import version
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}  # Set of allowed file extensions

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

# Function to create the Flask app
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SECRET_KEY'] = 'secret123'
    app.config['JWT_SECRET_KEY'] = 'secret1234'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max for file uploads

    CORS(
        app, 
        supports_credentials=True, 
        resources={r"*": {"origins": ["*"]}}, 
        allow_headers=["Authorization", "Content-Type", "app-version"], 
        methods=["GET", "POST", "OPTIONS"], max_age=86400
        )

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()

    @app.before_request
    def check_app_version():
        app_version = request.headers.get('app-version')
        if app_version and version.parse(app_version) < version.parse("1.2.0"):
            return jsonify({'message': 'Please update your client application'}), 426

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @app.route('/')
    def index():
        return jsonify({'status': 200})

    @app.route('/register', methods=['POST'])
    def register():
        try:
            username = request.form['username']
            password = request.form['password']
            motto = request.form.get('motto')
            avatar_file = request.files['avatar']

            if not (username and password):
                return jsonify({'message': 'Username and Password are required'}), 400

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

            new_user = User(username=username, password=hashed_password)

            if avatar_file and allowed_file(avatar_file.filename):
                filename = secure_filename(avatar_file.filename)
                avatar_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                avatar_file.save(avatar_path)
                new_user.avatar = avatar_path

            if motto:
                new_user.motto = motto

            db.session.add(new_user)
            db.session.commit()

            return jsonify({'message': 'User registered successfully'}), 201

        except Exception as e:
            return jsonify({'message': f'Registration failed: {str(e)}'}), 500

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user and bcrypt.check_password_hash(user.password, data['password']):
            access_token = create_access_token(identity={'username': user.username})
            return jsonify({'token': access_token}), 200
        return jsonify({'message': 'Invalid credentials'}), 401

    @app.route('/user', methods=['GET'])
    @jwt_required()
    def user():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user['username']).first()
        if user:
            user_data = {
                'id': user.id,
                'username': user.username,
                'avatar': user.avatar,
                'motto': user.motto
            }
            return jsonify(user_data), 200
        return jsonify({'message': 'User not found'}), 404
    
    @app.route('/upload', methods=['POST'])
    @jwt_required()
    def upload():
        if 'audio' not in request.files:
            return jsonify({"message": "No audio file provided"}), 400

        audio_file = request.files['audio']
        user_id = get_jwt_identity()

        def process_transcription(user_id, audio_file):
            with app.app_context():
                try:
                    time.sleep(random.randint(5, 15))
                    transcript = "This is a transcribed audio."

                    encrypted_motto = cipher_suite.encrypt(transcript.encode())
                    encrypted_motto_str = encrypted_motto.decode('utf-8')

                    print(f"Encrypted motto: {encrypted_motto_str}")

                    user = db.session.get(User, user_id)
                    if user:
                        user.motto = encrypted_motto_str
                        db.session.commit()
                except Exception as e:
                    print(f"Error during transcription processing: {e}")

        threading.Thread(target=process_transcription, args=(user_id, audio_file)).start()

        return jsonify({"message": "Audio uploaded successfully"}), 202

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    return app

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    avatar = db.Column(db.String(255), nullable=True, default=None)
    motto = db.Column(db.String(255), nullable=True, default=None)

    def __repr__(self):
        return f'<User {self.username}>'

# Run the application if this script is executed directly
if __name__ == '__main__':
    app = create_app()
    app.run(port=3002, debug=True)
