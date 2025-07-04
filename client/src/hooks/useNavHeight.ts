import { SCREEN_SIZE, useDetectScreenType } from "./useDetectScreenType.ts";
import { useEffect, useState } from "react";

const NAV_HEIGHT_PX = 80;

export const useNavHeight = () => {
  const isMobile = useDetectScreenType(SCREEN_SIZE.SMALL);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isMobile) {
      setHeight(NAV_HEIGHT_PX);
    } else {
      setHeight(0);
    }
  }, [isMobile]);

  return height;
};
