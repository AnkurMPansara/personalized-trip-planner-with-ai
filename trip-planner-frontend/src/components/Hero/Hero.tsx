import React from 'react';
import './Hero.css';
import HeroSlider from './HeroSlider/HeroSlider';
import QueryBox from './Querybox/Querybox';

const Hero: React.FC = () => {
  return (
    <section className="hero">
        <HeroSlider />
        <QueryBox />
    </section>
  );
};

export default Hero;