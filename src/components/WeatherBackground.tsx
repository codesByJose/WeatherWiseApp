import { useEffect, useState } from 'react';

interface WeatherBackgroundProps {
  condition: string;
}

export function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderBackground = () => {
    const normalizedCondition = condition.toLowerCase();

    if (normalizedCondition.includes('clear') || normalizedCondition.includes('sun')) {
      return <ClearSky />;
    } else if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
      return <RainBackground />;
    } else if (normalizedCondition.includes('snow')) {
      return <SnowBackground />;
    } else if (normalizedCondition.includes('cloud')) {
      return <CloudyBackground />;
    } else if (normalizedCondition.includes('wind')) {
      return <WindyBackground />;
    } else {
      return <DefaultBackground />;
    }
  };

  return (
    <div className={`fixed inset-0 -z-10 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {renderBackground()}
    </div>
  );
}

function ClearSky() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-300 to-yellow-100 animate-pulse-slow">
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl animate-sun-glow"></div>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

function RainBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-blue-200 animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${20 + Math.random() * 30}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

function SnowBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-300 via-gray-200 to-white">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full animate-snow"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

function CloudyBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/30 rounded-full animate-clouds"
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${50 + Math.random() * 80}px`,
            top: `${10 + i * 12}%`,
            left: `${-20 + Math.random() * 40}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${20 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

function WindyBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-500 via-sky-400 to-sky-300">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 bg-white/40 animate-wind"
          style={{
            width: `${50 + Math.random() * 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${-20}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function DefaultBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300"></div>
  );
}
