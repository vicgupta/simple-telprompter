import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Teleprompter
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Professional teleprompter for smooth, confident presentations
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Control your script with precision. Adjustable speed, customizable font size, and keyboard shortcuts for seamless delivery.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Fast & Smooth</h3>
            <p className="text-gray-400 text-sm">Adjustable scrolling speed for perfect timing</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Easy Controls</h3>
            <p className="text-gray-400 text-sm">Keyboard shortcuts and intuitive interface</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-semibold mb-2">Customizable</h3>
            <p className="text-gray-400 text-sm">Adjust font size and appearance to your needs</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 border border-gray-600"
          >
            Sign In
          </Link>
        </div>

        {/* Quick access link */}
        <div className="mt-8">
          <Link
            href="/teleprompter"
            className="text-gray-400 hover:text-gray-300 underline text-sm"
          >
            Continue as guest
          </Link>
        </div>
      </div>
    </div>
  );
}
