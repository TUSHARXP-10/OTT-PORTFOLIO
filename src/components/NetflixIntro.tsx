import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NetflixIntro = () => {
  const navigate = useNavigate();
  const [showLetters, setShowLetters] = useState(0);
  const letters = ["N", "E", "T", "F", "L", "I", "X"];

  useEffect(() => {
    // Animate letters one by one
    const letterInterval = setInterval(() => {
      setShowLetters((prev) => {
        if (prev < letters.length) {
          return prev + 1;
        }
        clearInterval(letterInterval);
        return prev;
      });
    }, 400);

    // Navigate to profile selection after 4 seconds
    const timeout = setTimeout(() => {
      navigate("/profile-selection");
    }, 4000);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-netflix-red/20 via-transparent to-transparent animate-pulse" />
      
      {/* Netflix Logo Animation */}
      <div className="relative flex items-center justify-center gap-2 md:gap-4">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`text-6xl md:text-9xl font-bold text-netflix-red transition-all duration-500 ${
              index < showLetters
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-50 translate-y-10"
            }`}
            style={{
              fontFamily: "'Netflix Sans', 'Helvetica Neue', Arial, sans-serif",
              textShadow: "0 0 20px rgba(229, 9, 20, 0.8), 0 0 40px rgba(229, 9, 20, 0.4)",
              animation: index < showLetters ? "glow-pulse 1.5s ease-in-out infinite" : "none"
            }}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Sound wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-netflix-red to-transparent animate-pulse" />
    </div>
  );
};

export default NetflixIntro;
