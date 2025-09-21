import React, { useEffect, useState } from "react";
import styles from "./HeroSlider.module.css";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1757581832363-9b59bc226c51"
];

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.heroSlider}>
      {images.map((img, index) => (
        <div
          key={index}
          className={styles.slide}
          style={{
            backgroundImage: `url(${img})`,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default HeroSlider;
