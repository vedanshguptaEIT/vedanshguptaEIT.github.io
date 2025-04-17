import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";

const EarthGlobe = () => {
  const globeEl = useRef();

  useEffect(() => {
    const globe = globeEl.current;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    // Set time-based rotation
    const now = new Date();
    const hours = now.getUTCHours();
    const rotation = (hours / 24) * 360;
    globe.pointOfView({ lat: 0, lng: rotation }, 1000);
  }, []);

  return (
    <div className="h-screen bg-black">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="#0c0c0c"
      />
    </div>
  );
};

export default EarthGlobe;
