'use client';

import { useEffect } from 'react';
import { useTeleprompter } from '@/hooks/useTeleprompter';
import Controls from '@/components/Controls';
import TextInput from '@/components/TextInput';
import TeleprompterDisplay from '@/components/TeleprompterDisplay';

export default function Home() {
  const {
    isPlaying,
    currentPosition,
    speed,
    fontSize,
    text,
    showInput,
    setSpeed,
    setFontSize,
    setText,
    togglePlayPause,
    reset,
    toggleInput,
  } = useTeleprompter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePlayPause();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <TextInput value={text} onChange={setText} show={showInput} />
      <TeleprompterDisplay text={text} currentPosition={currentPosition} fontSize={fontSize} />
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        fontSize={fontSize}
        showInput={showInput}
        onTogglePlayPause={togglePlayPause}
        onReset={reset}
        onToggleInput={toggleInput}
        onSpeedChange={setSpeed}
        onFontSizeChange={setFontSize}
      />
    </div>
  );
}
