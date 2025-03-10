import { useEffect } from "react";
import Spline from "@splinetool/react-spline";
import "./SplineBackground.css";

const SplineBackground = () => {
  // Prevenir eventos de scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".spline-background")) {
        e.stopPropagation();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    return () =>
      window.removeEventListener("wheel", handleWheel, { capture: true });
  }, []);

  return (
    <div className="spline-background">
      <Spline scene="https://prod.spline.design/hsLEx4QmEWRmg1xN/scene.splinecode" />
    </div>
  );
};

export default SplineBackground;
