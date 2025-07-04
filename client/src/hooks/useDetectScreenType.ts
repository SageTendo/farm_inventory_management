import { useState, useEffect } from "react";

export const SCREEN_SIZE = {
  SMALL: 640,
  MEDIUM: 768,
  LARGE: 1024,
  XLARGE: 1280,
  XXLARGE: 1536,
};

export function useDetectScreenType(screenSize: number): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < screenSize;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < screenSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return isMobile;
}
