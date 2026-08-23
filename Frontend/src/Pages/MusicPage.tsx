import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMusicById } from "../Api/getMusicById";

const MusicPage: React.FC = () => {
  const { id } = useParams();

  const [music, setMusic] = useState<SearchResult | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await getMusicById(id!);
        setMusic(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMusic();
  }, [id]);

  if (!music) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] text-center">

        <img
          src={music.coverArt}
          alt={music.title}
          className="w-full aspect-square object-cover rounded-lg"
        />

        <h1 className="text-3xl mt-5">
          {music.title}
        </h1>

        <p className="text-xl mt-2">
          {music.artist.username}
        </p>

        <audio
          controls
          src={music.uri}
          className="w-full mt-6"
        />

      </div>
    </div>
  );
};

export default MusicPage;