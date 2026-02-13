import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate sparkles
    const newSparkles: Sparkle[] = [];
    const sparkleCount = 30;

    for (let i = 0; i < sparkleCount; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 3 + 1, // 1-4px
        delay: Math.random() * 2, // 0-2s
        duration: Math.random() * 3 + 2, // 2-5s
      });
    }

    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute bg-purple-300 rounded-full animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
