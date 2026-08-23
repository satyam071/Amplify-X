import React from "react";

import HeroSection from "./Components/HeroSection";
import NowPlaying from "./Components/NowPlaying";
import TrendingAlbum from "./Components/TrendingAlbums";



const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <NowPlaying />
      <TrendingAlbum />
    </div>
  );
};

export default HomePage;