import { useState, useEffect, useRef, useCallback } from 'react';

export function useTeleprompter() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [fontSize, setFontSize] = useState(36);
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(true);

  const animationIdRef = useRef<number | null>(null);

  const scroll = useCallback(() => {
    setCurrentPosition((prev) => prev + speed / 30);
    animationIdRef.current = requestAnimationFrame(scroll);
  }, [speed]);

  useEffect(() => {
    if (isPlaying) {
      animationIdRef.current = requestAnimationFrame(scroll);
    } else {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    }

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying, scroll]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentPosition(0);
  }, []);

  const toggleInput = useCallback(() => {
    setShowInput((prev) => !prev);
  }, []);

  return {
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
  };
}
