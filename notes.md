

**Models**

- Updated User model to include additional fields for avatar and motto.
- Utilized bcrypt for password hashing to enhance security.
- Implemented CORS policies to restrict cross-origin requests, ensuring secure communication between frontend and backend.

**Register Endpoint**

- Modified /register endpoint to handle new user data (name, bio, profilePicUrl, motto) in the request body.
- Encrypted the motto using bcrypt before storing it in the database to protect sensitive user information.
- Created a new instance of the User model with the additional fields populated from the request data.

**Frontend Changes**

- Updated Register.tsx to include input fields for name, motto, avatar.
- Added state variables and event handlers to manage data input for new fields.

**General**

- Ensured backend /user endpoint provides necessary user data (username, avatar, motto) in the response.
- Managed storage of access tokens in localStorage post successful login or registration on the client-side.

* Review and understand original requirements
	+ Ensure we're fulfilling all necessary features and functionality:
		- [x] Finish implementing the `user` route in the backend to return user information to the frontend.
		- [ ] Implement the logic to have the `/login` and `/register` endpoints store the authentication token in such a way that the rest of the application can access it.
		- [x] Create a `/logout` functionality in the frontend.
		- [x] Use shadcn (or other component library) to make the auth components slightly more stylish. (Spend very little time on this!)
		- [x] Create a user profile component according to the wireframe in `wireframes/profile_screen.png` to fetch and display user data after login. Add corresponding required data to `/register` endpoint and Register component.


### Version Management

* [x] Look at the `APIService.ts` file in the frontend `services` folder. Reimplement all network requests in the frontend to use this service, so that the `app-version` header is sent with every single request.
* [x] Make it so that if the app-version header with a request is < 1.2.0, the server doesn't process the request but instead returns a message that prompts the user to update their client application.
* [x] Handle this update message in the frontend and display a message in the UI.
* [x] Optional: Mock the transition from the old version of the application to the new one, so initial load is a version below 1.2.0 and subsequent interactions send a version above.

### Audio Recording

* [x] Use the MediaRecorder API (built into browser) to build a very simple recorder component that records up to a maximum of 15 seconds of audio (audio/webm codec).
* [x] After 15 seconds have been reached or the user stops the recording, send the audio blob to an `/upload` endpoint on the backend.
* [x] Mock a Python function that mimics the process of sending this audio to a third-party transcription service that returns a transcript of the audio. (BONUS: If you moved quickly through everything else and want to actually implement a local transcription model, go ahead!)
* [ ] Save this transcription text to the user database as the user's motto and update the user profile to display their self-recorded motto.

### Encrypt it

* [x] We don't want to store the patient's motto in plaintext. Encrypt it when you store it and decrypt it when you retrieve it.

### Make it Async

* [x] Change the mock transcription function so that it takes a random amount of time between 5 and 15 seconds to return.
* [x] Make it so that the backend can handle multiple users submitting recordings at the same time, and still serve profile information to other users.

**Post Mortem**

- Modified plan and adjusted priorities to accommodate unforeseen challenges.  
Prepare environment for changes
		+ Set up new database schema (if needed) for extern
		+ Update authentication and authorization mechanisms to store JWT tokens securely (Cookies)
		+ Prepare UI components for Redux integration
	* Implement main changes
		+ Integrate Redux state management
		+ Migrate existing state management to Redux
		+ Update UI components to use new Redux-based state management adnreorganize css classifiers
	* Verify and test changes
		+ Thoroughly test all changes to ensure they meet original requirements
		+ Verify that Redux is working correctly and updating application state as expected
		  
	-----Docker enc and secrets or NixOs for deploying locally


