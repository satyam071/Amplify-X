import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAllMusic } from "../Api/get.music";
import MusicCards from "../components/MusicCards";

interface Props { }

interface SearchResult {
  _id: string;
  title: string;
  coverArt: string;
  uri?: string;
  artist: {
    _id: string;
    username: string;
  };
}

const DEFAULT_IMAGE =
  "https://placehold.co/600x600/111111/ffffff?text=No+Cover";

const ListenRelease: React.FC<Props> = () => {
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [allMusicData, setAllMusicData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);

        const response = await getAllMusic();
        setAllMusicData(response);

        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    console.log("Selected:", selectedItem);
  }, [selectedItem]);

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <section className="max-w-7xl mx-auto">

        <div className="mb-8">
          <p className="text-sm sm:text-base text-gray-400 mb-2">
            Discover your next favorite song
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Listen Music
          </h1>
        </div>

        {/* Search */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-full max-w-3xl">
            <SearchBar onSelect={setSelectedItem} />
          </div>
        </div>

        {/* Section heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">
              All Music
            </h2>

            {!loading && (
              <p className="text-sm text-gray-500 mt-1">
                {allMusicData.length} songs available
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-3 h-3 bg-white rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && allMusicData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-5">
              🎵
            </div>

            <h2 className="text-xl font-semibold">
              No music available
            </h2>

            <p className="text-gray-500 mt-2">
              There aren't any songs available yet.
            </p>
          </div>
        )}

        {/* Music grid */}
        {!loading && allMusicData.length > 0 && (
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
              gap-y-8
            "
          >
            {allMusicData.map((music) => (
              <div
                key={music._id}
                className="
                  group
                  min-w-0
                  transition-transform
                  duration-300
                  hover:-translate-y-1
                "
              >
                <MusicCards
                  songName={music.title}
                  artistName={music.artist?.username || "Unknown Artist"}
                  image={music.coverArt || DEFAULT_IMAGE}
                  onSelect={() => {
                    window.open(`/music/${music._id}`, "_blank");
                  }}
                />
              </div>
            ))}
          </div>
        )}

      </section>
    </main>
  );
};

export default ListenRelease;