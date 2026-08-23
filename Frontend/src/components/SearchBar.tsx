import React, { useEffect, useState } from "react";
import { searchQueryApi } from "../Api/Search.query";
import SearchCards from "./SearchCards";

interface Props {
  onSelect?: (item: SearchResult) => void;
}

interface SearchResult {
  _id: string;
  title: string;
  coverArt: string;
  artist: {
    _id: string;
    username: string;
  };

}
interface SearchResultProps extends SearchResult {
  onSelect?: (item: SearchResult) => void;
}

const SearchBar: React.FC<Props> = ({ onSelect }) => {
  const [searchResult, setSearchResult] = useState<SearchResult[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const handleSelectedCard = (item: SearchResult) => {
    console.log(item);
    onSelect?.(item);

  }

  useEffect(() => {
    console.log("Use Effect is running")
    if (!searchQuery.trim()) {
      setSearchResult([]);
      return;
    }
    const timer = setTimeout(async () => {
      console.log("Api is running")
      const response = await searchQueryApi({
        q: searchQuery
      })
      setSearchResult(response)
      console.log("This is a response", response)


    }, 500)

    return () => {
      clearTimeout(timer);

    }

  }, [searchQuery]);

  return (
    <div className="relative w-full max-w-xl">
      {/* Search Input */}
      <div className="relative">
        <input
          className="
          w-full
          bg-zinc-900/80
          border border-zinc-700
          rounded-full
          px-5 py-3
          pr-12
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all duration-300
          focus:border-purple-500
          focus:ring-2 focus:ring-purple-500/20
          hover:border-zinc-600
        "
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
          type="text"
          placeholder="Search songs, artists..."
        />
      </div>

      {/* Search Results */}
      {searchResult.length > 0 && (
        <div
          className="
          absolute
          z-50
          top-full
          left-0
          right-0
          mt-2
          p-2
          rounded-2xl
          bg-zinc-950/95
          backdrop-blur-xl
          border border-zinc-800
          shadow-2xl shadow-black/50
          max-h-80
          overflow-y-auto
          scrollbar-none
        "
        >
          <div className="px-3 py-2 text-xs uppercase tracking-wider text-zinc-500">
            Search Results
          </div>

          <div className="flex flex-col gap-1">
            {searchResult.map((items) => (
              <div
                key={items._id}
                className="
                rounded-xl
                overflow-hidden
                transition-all duration-200
                hover:bg-white/5
              "
              >
                <SearchCards
                  {...items}
                  onSelect={handleSelectedCard}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;