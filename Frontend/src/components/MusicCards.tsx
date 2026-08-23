import React from "react";

interface Props {
  className?: string;
  songName?: string;
  albumName?: string;
  artistName?: string;
  image?: string | null;
  onSelect?: () => void;
}

const DEFAULT_IMAGE =
  "https://placehold.co/600x600/111111/ffffff?text=No+Cover";

const MusicCards: React.FC<Props> = ({
  className,
  songName,
  albumName,
  artistName,
  image,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`
        w-full
        min-w-0
        cursor-pointer
        group
        ${className || ""}
      `}
    >
      {/* Cover */}
      <div className="relative overflow-hidden rounded-xl bg-zinc-900 aspect-square">
        <img
          src={image || DEFAULT_IMAGE}
          alt={songName || albumName || "Music"}
          className="
            w-full
            h-full
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:brightness-75
          "
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />

        {/* Play button */}
        <div
          className="
            absolute
            bottom-3
            right-3
            w-10
            h-10
            sm:w-11
            sm:h-11
            rounded-full
            bg-white
            text-black
            flex
            items-center
            justify-center
            opacity-0
            translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-300
            shadow-lg
          "
        >
          ▶
        </div>
      </div>

      {/* Song information */}
      <div className="mt-3 min-w-0">
        {songName && (
          <h1
            className="
              text-sm
              sm:text-base
              font-medium
              truncate
              text-white
            "
            title={songName}
          >
            {songName}
          </h1>
        )}

        {artistName && (
          <p
            className="
              text-xs
              sm:text-sm
              text-gray-400
              truncate
              mt-1
            "
            title={artistName}
          >
            {artistName}
          </p>
        )}

        {albumName && (
          <p
            className="
              text-xs
              text-gray-500
              truncate
              mt-1
            "
            title={albumName}
          >
            {albumName}
          </p>
        )}
      </div>
    </div>
  );
};

export default MusicCards;