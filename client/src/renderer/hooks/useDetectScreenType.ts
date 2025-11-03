import { useAtom } from "jotai";
import { useEffect } from "react";
import { isMobileAtom } from "../atoms";

export const SCREEN_SIZE = {
  SMALL: 640,
  MEDIUM: 768,
  LARGE: 1024,
  XLARGE: 1280,
  XXLARGE: 1536,
};

export function useDetectScreenType(
  screenSize: number = SCREEN_SIZE.LARGE
): boolean {
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < screenSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return isMobile;
}
