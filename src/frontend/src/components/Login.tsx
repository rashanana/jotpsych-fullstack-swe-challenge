import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';

function Login() {
  const [username, setUsername] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [message, setMessage] = useState<string>(''); 

  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setMessage('Login successful');
      navigate('/profile');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      
    >
      <Card
        className="mx-auto max-w-sm" 
      >
        <CardHeader
          className="space-y-1"
        >
          <CardTitle
            className="text-2xl font-bold"
          >
            Login
          </CardTitle>
          <CardDescription>
            Enter your username and password to and start exploring!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div
              className="space-y-4"              
            >
              <div
                className="space-y-2"                
              >
                <Label
                  htmlFor="username"
                >
                  Username
                </Label>
                <Input
                  autoComplete="on"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div
                className="space-y-2"                
              >
                <Label
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  autoComplete="on"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Login
              </Button>
              <div className="flex items-center justify-between">            
            <Link to="/register" className="text-sm font-medium text-primary hover:underline" >
              Forget password?
            </Link>
            <Link to="/register" className="text-sm font-medium text-primary hover:underline" >
              Sign-up
            </Link>
            </div>               
            </div>
          </form>
          {message && (
            <p>
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;