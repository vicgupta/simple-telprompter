'use client';

interface TeleprompterDisplayProps {
  text: string;
  currentPosition: number;
  fontSize: number;
}

export default function TeleprompterDisplay({
  text,
  currentPosition,
  fontSize,
}: TeleprompterDisplayProps) {
  const getParagraphs = () => {
    if (!text || text.trim() === '') {
      return [
        'Welcome to the Web Teleprompter!',
        'Enter your script in the text box below, then click Start to begin scrolling.',
        'Use the speed slider to control how fast the text scrolls.',
        'Use the font size slider to adjust text size.',
        'Press spacebar to play/pause, or click the Start button.',
      ];
    }
    return text.split('\n').filter((p) => p.trim() !== '');
  };

  return (
    <>
      <div className="fixed top-[40vh] left-0 right-0 h-0.5 bg-white/30 pointer-events-none z-[999]" />
      <div className="absolute top-0 left-0 right-0 bottom-[100px] overflow-hidden">
        <div
          className="px-20 py-12 leading-[1.8] text-center relative"
          style={{
            top: `-${currentPosition}px`,
            fontSize: `${fontSize}px`,
            willChange: 'top',
          }}
        >
          {getParagraphs().map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
