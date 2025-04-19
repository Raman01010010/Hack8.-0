import React, { useRef, useState } from 'react';

const VideoProcessor = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [frame, setFrame] = useState(null);

  // Function to extract a frame from the video
  const extractFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data (the frame)
    const imageData = canvas.toDataURL('image/png');
    setFrame(imageData);
  };

  // Function to extract audio from the video
  const extractAudio = () => {
    const video = videoRef.current;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(video);
    const analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Start playing audio if video is not already playing
    video.play();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Static Video Processing</h2>

      <video
        ref={videoRef}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
        controls
        width="600"
      />

      <div className="mt-4">
        <button
          onClick={extractFrame}
          className="p-2 bg-blue-500 text-white rounded mr-2"
        >
          Extract Frame
        </button>
        <button
          onClick={extractAudio}
          className="p-2 bg-green-500 text-white rounded"
        >
          Extract Audio
        </button>
      </div>

      {frame && (
        <div className="mt-4">
          <p className="font-semibold">Extracted Frame:</p>
          <img src={frame} alt="Extracted Frame" />
        </div>
      )}
    </div>
  );
};

export default VideoProcessor;
