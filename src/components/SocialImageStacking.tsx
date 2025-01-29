import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "./socials/social-0.svg",
  "./socials/social-1.svg",
  "./socials/social-2.svg",
  "./socials/social-3.svg",
  "./socials/social-4.svg",
  "./socials/social-5.svg",
];

const SocialImageStacking = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-64">
      {images.map((src, index) => {
        const positionOffset =
          (index - currentIndex + images.length) % images.length;
        const zIndex = 10 - positionOffset;
        const scale = 1 - positionOffset * 0.05;
        const translateY = positionOffset * -10;
        const translateX = positionOffset * 12;

        return (
          <div
            key={index}
            className="absolute inset-0 transition-transform duration-1000"
            style={{
              zIndex: zIndex,
              transform: `translateY(${translateY}%) translateX(${translateX}%) scale(${scale})`,
              opacity: positionOffset === 0 ? 1 : 1,
            }}>
            <Image
              src={src}
              alt={`Social ${index}`}
              layout="fill"
              objectFit="contain"
              className="sm:scale-125"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SocialImageStacking;
