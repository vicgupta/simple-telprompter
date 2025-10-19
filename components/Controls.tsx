'use client';

import { useRouter } from 'next/navigation';
import VideoRecorder from './VideoRecorder';

interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  fontSize: number;
  showInput: boolean;
  onTogglePlayPause: () => void;
  onReset: () => void;
  onToggleInput: () => void;
  onSpeedChange: (speed: number) => void;
  onFontSizeChange: (fontSize: number) => void;
}

export default function Controls({
  isPlaying,
  speed,
  fontSize,
  showInput,
  onTogglePlayPause,
  onReset,
  onToggleInput,
  onSpeedChange,
  onFontSizeChange,
}: ControlsProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 p-4 flex gap-5 items-center flex-wrap z-[1000] border-t-2 border-gray-600">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onTogglePlayPause}
          className={`font-bold py-2 px-5 text-sm rounded transition-colors ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPlaying ? '⏸ Pause' : '▶ Start'}
        </button>

        <button
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 text-sm rounded transition-colors"
        >
          ↺ Reset
        </button>

        <button
          onClick={onToggleInput}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-5 text-sm rounded transition-colors"
        >
          {showInput ? 'Hide Input' : 'Show Input'}
        </button>

        <VideoRecorder />

        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-5 text-sm rounded transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <label htmlFor="speedControl" className="text-sm font-bold text-gray-400">
          Speed:
        </label>
        <input
          type="range"
          id="speedControl"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-[150px] cursor-pointer"
        />
        <span className="min-w-[60px] text-center bg-gray-700 py-1 px-2.5 rounded text-sm">
          {speed}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <label htmlFor="fontSizeControl" className="text-sm font-bold text-gray-400">
          Font Size:
        </label>
        <input
          type="range"
          id="fontSizeControl"
          min="16"
          max="100"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-[150px] cursor-pointer"
        />
        <span className="min-w-[60px] text-center bg-gray-700 py-1 px-2.5 rounded text-sm">
          {fontSize}px
        </span>
      </div>
    </div>
  );
}
