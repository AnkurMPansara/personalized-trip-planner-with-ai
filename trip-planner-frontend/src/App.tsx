import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import './App.css';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default App;