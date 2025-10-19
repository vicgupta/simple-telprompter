import { useState, useRef, useCallback, useEffect } from 'react';

interface Camera {
  deviceId: string;
  label: string;
}

export function useCamera() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const getCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      const cameraList = videoDevices.map((device, index) => ({
        deviceId: device.deviceId,
        label: device.label || `Camera ${index + 1}`,
      }));

      setCameras(cameraList);

      if (cameraList.length > 0) {
        setSelectedCamera(cameraList[0].deviceId);
        await startCamera(cameraList[0].deviceId);
      }
    } catch (error) {
      console.error('Error getting cameras:', error);
      alert('Unable to access cameras. Please ensure camera permissions are granted.');
    }
  }, []);

  const startCamera = useCallback(async (deviceId: string) => {
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
        audio: true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error starting camera:', error);
      alert('Unable to start camera. Please check permissions and try again.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  const toggleCamera = useCallback(async () => {
    if (showCamera) {
      stopCamera();
      setShowCamera(false);
    } else {
      setShowCamera(true);
      await getCameras();
    }
  }, [showCamera, getCameras, stopCamera]);

  const startRecording = useCallback(() => {
    if (!mediaStreamRef.current) {
      alert('Please select a camera first.');
      return;
    }

    recordedChunksRef.current = [];

    try {
      let options: MediaRecorderOptions = { mimeType: 'video/webm;codecs=vp9,opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm;codecs=vp8,opus' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: 'video/webm' };
        }
      }

      const recorder = new MediaRecorder(mediaStreamRef.current, options);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to start recording. Your browser may not support video recording.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const downloadVideo = useCallback(() => {
    if (!recordedVideoUrl) return;

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = recordedVideoUrl;
    a.download = `teleprompter-recording-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(recordedVideoUrl);
    }, 100);
  }, [recordedVideoUrl]);

  useEffect(() => {
    if (selectedCamera && showCamera) {
      startCamera(selectedCamera);
    }
  }, [selectedCamera, showCamera, startCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    cameras,
    selectedCamera,
    isRecording,
    showCamera,
    recordedVideoUrl,
    videoRef,
    setSelectedCamera,
    toggleCamera,
    toggleRecording,
    downloadVideo,
  };
}
