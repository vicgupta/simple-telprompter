'use client';

import { useCamera } from '@/hooks/useCamera';

export default function VideoRecorder() {
  const {
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
  } = useCamera();

  return (
    <>
      <button
        onClick={toggleCamera}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        📹 {showCamera ? 'Hide' : 'Show'} Camera
      </button>

      {showCamera && (
        <div className="fixed bottom-28 right-5 z-[1001] bg-gray-900/95 border-2 border-gray-600 rounded-lg p-2.5">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-[280px] h-[210px] bg-black rounded block scale-x-[-1]"
          />
          <div className="mt-2.5 flex flex-col gap-2">
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded text-sm"
            >
              <option value="">Select Camera...</option>
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </option>
              ))}
            </select>

            {isRecording && (
              <div className="text-orange-500 font-bold text-xs text-center">
                ⬤ RECORDING
              </div>
            )}

            <button
              onClick={toggleRecording}
              className={`text-white font-bold py-2 px-4 rounded transition-colors ${
                isRecording
                  ? 'bg-orange-600 hover:bg-orange-700 animate-pulse'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isRecording ? '⬛ Stop Recording' : '● Start Recording'}
            </button>

            <button
              onClick={downloadVideo}
              disabled={!recordedVideoUrl}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ⬇ Download Video
            </button>
          </div>
        </div>
      )}
    </>
  );
}
