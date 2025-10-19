# Web Teleprompter - Next.js

A professional teleprompter application built with Next.js, TypeScript, and Tailwind CSS. Features include text scrolling, customizable speed and font size, video recording with camera preview, and keyboard controls.

## Features

- **Auto-scrolling teleprompter** with adjustable speed
- **Customizable font size** for optimal reading
- **Video recording** with camera selection and preview
- **Keyboard shortcuts** (Spacebar to play/pause)
- **Responsive design** with modern UI
- **Built with Next.js 15** and TypeScript

## Project Structure

```
teleprompter-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── Controls.tsx        # Control panel component
│   ├── TeleprompterDisplay.tsx  # Text display component
│   ├── TextInput.tsx       # Script input component
│   └── VideoRecorder.tsx   # Camera and recording component
├── hooks/
│   ├── useTeleprompter.ts  # Teleprompter state management
│   └── useCamera.ts        # Camera and recording logic
└── package.json
```

## Getting Started

### Installation

```bash
cd teleprompter-nextjs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Enter your script** in the text input area at the top
2. **Adjust settings** using the control panel:
   - Speed: Control scroll speed (1-100)
   - Font Size: Adjust text size (16-100px)
3. **Click "Start"** or press **Spacebar** to begin scrolling
4. **Optional**: Enable camera to record yourself reading
   - Click "Show Camera" to access camera controls
   - Select your preferred camera
   - Click "Start Recording" to begin
   - Click "Download Video" when finished

## Keyboard Shortcuts

- **Spacebar**: Play/Pause scrolling

## Camera Permissions

The application requires camera and microphone permissions for video recording features. Grant permissions when prompted by your browser.

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **MediaRecorder API** - Browser-based video recording
- **getUserMedia API** - Camera access

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Modern browsers with support for MediaRecorder API and getUserMedia are required for video recording features.

## Migrated from HTML

This project was refactored from a single HTML file into a modern Next.js application with:
- Component-based architecture
- TypeScript for type safety
- Custom React hooks for state management
- Tailwind CSS for styling
- Improved code organization and maintainability
