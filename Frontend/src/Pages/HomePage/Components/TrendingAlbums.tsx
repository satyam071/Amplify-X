import React from "react";
import MusicCards from "../../../components/MusicCards";

interface Props { }

const response = {
  songs: [
    {
      songName: "Blinding Lights",
      albumName: "After Hours",
      artistName: "The Weeknd",
      conceptArt:
        "https://i.pinimg.com/736x/c8/92/04/c892048962b5457f862cb2dada423bea.jpg",
    },
    {
      songName: "Starboy",
      albumName: "Starboy",
      artistName: "The Weeknd",
      conceptArt:
        "https://i.pinimg.com/736x/b4/2c/5d/b42c5dae624a94ff35ec8a5f932b61c2.jpg",
    },
    {
      songName: "Sweater Weather",
      albumName: "I Love You.",
      artistName: "The Neighbourhood",
      conceptArt:
        "https://i.pinimg.com/736x/f8/2c/88/f82c880dea68bcd640ff8f09b6a80536.jpg",
    },
    {
      songName: "Say you won't let go",
      albumName: "Back from the Edge",
      artistName: "James Arthur",
      conceptArt:
        "https://i.pinimg.com/736x/5f/0b/07/5f0b070ea6de388be3c7c014d332efcb.jpg",
    },
    {
      songName: "Yellow",
      albumName: "Parachutes",
      artistName: "Coldplay",
      conceptArt:
        "https://i.pinimg.com/1200x/35/9d/c6/359dc694081642bb281e2a016a012abd.jpg",
    },
  ],
};

const TrendingAlbums: React.FC<Props> = () => {
  return (
    <section className="w-full py-8 sm:py-10 md:py-12">

      {/* Heading */}
      <div className="px-4 sm:px-6 md:px-10 mb-8">
        <p className="text-sm sm:text-base text-gray-400 mb-2">
          What's popular right now
        </p>

        <h1
          className="
            font-oswald
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-semibold
            tracking-tight
          "
        >
          Trending Albums
        </h1>
      </div>

      {/* Album grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-x-4
          sm:gap-x-5
          md:gap-x-6
          gap-y-8
          px-4
          sm:px-6
          md:px-8
          lg:px-10
        "
      >
        {response.songs.map((song, index) => (
          <MusicCards
            key={`${song.songName}-${index}`}
            songName={song.songName}
            albumName={song.albumName}
            artistName={song.artistName}
            image={song.conceptArt}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingAlbums;