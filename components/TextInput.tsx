'use client';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  show: boolean;
}

export default function TextInput({ value, onChange, show }: TextInputProps) {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900/95 border-b-2 border-gray-600 z-[1000]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your teleprompter script here... Each paragraph will be displayed separately. Click 'Hide Input' to focus on reading."
        className="w-full h-[150px] p-4 bg-gray-800 text-white border-none text-base resize-none placeholder:text-gray-500"
      />
    </div>
  );
}
