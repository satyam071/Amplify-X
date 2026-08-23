import React from "react";

interface SearchResultProps {
  _id: string;
  title: string;
  coverArt: string;
  artist: {
    _id: string;
    username: string;
  };
  onSelect?: (item:SearchResultProps) => void;
}

const SearchCards: React.FC<SearchResultProps> = (items) => {
  return (
    <div
      onClick={() => items.onSelect?.(items)}

      className="w-80 h-16 flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer">
      <img
        className="w-12 h-12 rounded-md object-cover"
        src={items.coverArt}
        alt={items.title}
      />

      <div className="min-w-0">
        <h1 className="text-sm font-medium text-white truncate">
          {items.title}
        </h1>

        <p className="text-xs text-gray-400 truncate">
          {items.artist.username}
        </p>
      </div>
    </div>
  );
};

export default SearchCards;