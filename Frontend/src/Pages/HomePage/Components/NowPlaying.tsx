import React from "react";
import MusicCards from "../../../components/MusicCards";

interface Props { }

const response = {
  message: "Music fetched successfully",
  musics: [
    {
      coverArt: null,
      _id: "6a757dc71483ed2835ca0f9d",
      uri: "https://ik.imagekit.io/wwxjbr35f/Amplify-X/music_1786084805967_oQJWIh4cA",
      title: "test_title",
      artist: {
        _id: "6a7464a02e071c0b1e34e6a0",
        username: "user2",
        email: "user2@123",
      },
    },
    {
      coverArt: null,
      _id: "6a75d96f4421196c758a8ea8",
      uri: "https://ik.imagekit.io/wwxjbr35f/Amplify-X/music_1786108268913_pj3n4SN4X",
      title: "test_title2",
      artist: {
        _id: "6a75d9354421196c758a8ea7",
        username: "user3",
        email: "user3@123",
      },
    },
    {
      coverArt: null,
      _id: "6a7c893d593fd52367441a60",
      uri: "https://ik.imagekit.io/wwxjbr35f/Amplify-X/music_1786546488295_ebxYEQ-5v",
      title: "Always you",
      artist: {
        _id: "6a7464a02e071c0b1e34e6a0",
        username: "user2",
        email: "user2@123",
      },
    },
    {
      coverArt: null,
      _id: "6a7c899d15eba5be6b14c6a8",
      uri: "https://ik.imagekit.io/wwxjbr35f/Amplify-X/music_1786546585380_-NBA0S-_P",
      title: "Always you",
      artist: {
        _id: "6a7464a02e071c0b1e34e6a0",
        username: "user2",
        email: "user2@123",
      },
    },
    {
      coverArt: null,
      _id: "6a7c89d5934299c8c5876208",
      uri: "https://ik.imagekit.io/wwxjbr35f/Amplify-X/music_1786546641382_Ke-cTzOheE",
      title: "Always you",
      artist: {
        _id: "6a7464a02e071c0b1e34e6a0",
        username: "user2",
        email: "user2@123",
      },
    },
    {
      _id: "6a7c8ee54db5bb0de78a3f82",
      uri: "https://ik.imagekit.io/wwxjbr35f/Amplify-X/music_1786547936910_R4KXGV4R3",
      title: "Always you",
      artist: {
        _id: "6a7464a02e071c0b1e34e6a0",
        username: "user2",
        email: "user2@123",
      },
      coverArt:
        "https://ik.imagekit.io/wwxjbr35f/Amplify-X/music_1786547939547_D9zmBMgWhR",
    },
  ],
};

const NowPlaying: React.FC<Props> = () => {
  return (
    <section className="w-full py-8 sm:py-10 md:py-12">

      {/* Heading */}
      <div className="px-4 sm:px-6 md:px-10 mb-8">
        <p className="text-sm sm:text-base text-gray-400 mb-2">
          Recently added to Amplify-X
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
          Now Playing
        </h1>
      </div>

      {/* Music */}
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
        {response.musics.map((music) => (
          <MusicCards
            key={music._id}
            songName={music.title}
            artistName={music.artist.username}
            image={music.coverArt}
            onSelect={() => {
              window.open(`/music/${music._id}`, "_blank");
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default NowPlaying;