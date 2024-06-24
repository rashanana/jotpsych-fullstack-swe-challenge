import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MicIcon, SettingsIcon } from 'lucide-react';
import APIService from '@/services/APIService';
import AudioRecorder from './AudioRecorder';

function UserProfile() {
  const [user, setUsername] = useState<string>("");
  const [avatar, setAvatarFile] = useState<string>("");
  const [motto, setMotto] = useState<string>("uh oh!");
  const [message, setMessage] = useState<string>("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiService = APIService;
        const data = await apiService.request("/user", "GET", null, true);
        setUsername(data.username);
        setMotto(data.motto);
        setAvatarFile(data.avatar);
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("Sorry about that! contact your account manager for further assistance.");
        }

        // Add a delay before calling handleLogout
        setTimeout(() => {
          alert("You will be logged out now.");
          handleLogout();
        }, 3000); // 3-second delay
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMottoClick = () => {
    navigate("/audio")// Toggle the visibility state
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card 
        key="1"
        className="rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-all duration-200"
      >
        
        <CardHeader className="flex justify-between items-center relative">
        <CardTitle className="text-2xl font-bold uppercase text-center w-full">
          {user}
          </CardTitle>
          <button
            onClick={() => {
              console.log("Settings button clicked");
            }}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
      
            <SettingsIcon className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            </button>
        </CardHeader>
        <CardContent>
          {avatar && (
            <img 
              src={`http://localhost:3002/${avatar}`} 
              alt={`${user}'s avatar`} 
              className="object-cover w-full"
              height="320"
              width="320"
              style={{ aspectRatio: "320/320", objectFit: "cover" }}
            />
          )}
          <div className="space-y-4 mt-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold hover:text-gray-700 transition-all duration-200">
                {motto}
              </h2>
            </div>
            {message && (
              <p className="text-red-500">
                {message}
              </p>
            )}
          </div>
          <div className="flex space-x-4 mt-4">
            <Button 
              onClick={handleMottoClick}
              className="inline-flex items-center justify-center rounded-full bg-red-500 p-4 text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <MicIcon className="h-6 w-6" />
            </Button>
            <Button
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>          
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;
