import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import APIService from '@/services/APIService';

function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // State to hold the uploaded file
  const [motto, setMotto] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !avatarFile) {
      setMessage('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('avatar', avatarFile);
    formData.append('motto', motto);

    try {
      const apiService = APIService;
      const data = await apiService.request("/register", "POST", formData);      
      setMessage(data.message);
      navigate("/login")      
    } catch (error) {
      setMessage('Failed to register. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign-up</CardTitle>
          <CardDescription>Join the community!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  autoComplete="on"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="on"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Upload Avatar</Label>
                <input
                  type="file"
                  id="avatar"
                  accept=""
                  // accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motto">Motto</Label>
                <Input
                  autoComplete="on"
                  id="motto"
                  type="text"
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Gain Access!
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:underline"
            >
              Have an account already?
            </Link>
          </div>
          {message && <p>{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
