import { Button } from "@/components/ui/button";
import { Mic, MicIcon, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import APIService from '@/services/APIService';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");


      try {
        const apiService = APIService;
        const data = await apiService.request("/upload", "POST", formData, true);      
        setMessage(data.message);
        navigate("/profile") 
             
      } catch (error) {
        setMessage('Failed to upload. Err resetting system.');
        localStorage.removeItem("token");
        navigate("/") 
      }

      audioChunksRef.current = [];
    };

    mediaRecorder.start();
    setRecording(true);

    setTimeout(() => {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        setRecording(false);
      }
    }, 15000);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
      <main className="flex items-center justify-center h-screen bg-red">
        <button 
        onClick={recording ? handleStopRecording : handleStartRecording}
        className="relative w-[300px] h-[300px] rounded-full bg-primary shadow-lg shadow-primary/50 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-300 animate-pulse">
          <div className="absolute inset-0 rounded-full border-4 border-primary-foreground" />
          <MicIcon className="h-20 w-20 text-primary-foreground" />
        </button>
      </main>
  );
}

export default AudioRecorder;
