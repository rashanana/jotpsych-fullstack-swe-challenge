import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Home() {
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      // Adjust the font size based on window width with tighter constraints
      const newFontSize = Math.max(6, Math.min(12, window.innerWidth / 100)); // Example adjustment with min and max limits
      setFontSize(newFontSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the font size

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // style={{ backgroundColor: '#FB542B'}}
  return (
    <div className="min-h-screen flex items-center justify-center bg-white-250">
      <aside className=" bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg font-mono" >
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <Link
            to="/login"
            className="text-sm font-medium text-primary hover:underline text-green-400"
          >
            Login
          </Link>
        </div>
        <div className="mt-4">          
        </div>
        <div className="mt-6">
          <pre style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 1.2}px`, color: '#89B4FA' }}>
          {`
██     ██ ███████ ██       ██████  ██████  ███    ███ ███████ ██ 
██     ██ ██      ██      ██      ██    ██ ████  ████ ██      ██ 
██  █  ██ █████   ██      ██      ██    ██ ██ ████ ██ █████   ██ 
██ ███ ██ ██      ██      ██      ██    ██ ██  ██  ██ ██         
 ███ ███  ███████ ███████  ██████  ██████  ██      ██ ███████ ██                                                                                                                                   
`}
          </pre>
        </div>
        <div className="mt-4 flex justify-center">
        <Link
            to="/register"
            className="text-sm font-medium text-primary hover:underline text-green-400"
          >
            Join in!
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default Home;
