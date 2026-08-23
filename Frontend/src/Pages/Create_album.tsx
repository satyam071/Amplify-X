import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchCards from "../components/SearchCards";
import { Trash2, Upload, Music2 } from "lucide-react";

interface SearchResult {
  _id: string;
  title: string;
  coverArt: string;
  artist: {
    _id: string;
    username: string;
  };
}

const CreateAlbum: React.FC = () => {
  // Album title
  const [title, setTitle] = useState("");

  // Cover art
  const [coverArt, setCoverArt] = useState<File | null>(null);

  // Multiple selected songs
  const [selectedItems, setSelectedItems] = useState<SearchResult[]>([]);

  // Handle cover image
  const handleCoverArtChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setCoverArt(file);
  };

  // Handle selecting a song from SearchBar
  const handleSelect = (item: SearchResult) => {
    setSelectedItems((prev) => {
      // Prevent duplicate songs
      const alreadySelected = prev.some(
        (song) => song._id === item._id
      );

      if (alreadySelected) {
        return prev;
      }

      return [...prev, item];
    });
  };

  // Remove one song
  const handleDelete = (id: string) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // Create album
  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter an album title.");
      return;
    }

    if (!coverArt) {
      alert("Please select a cover art.");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please add at least one song.");
      return;
    }

    // This is the data that you'll eventually send to your backend
    const albumData = {
      title: title.trim(),
      coverArt,
      songs: selectedItems.map((song) => song._id),
    };

    console.log("Album data:", albumData);
    console.log("Selected songs:", selectedItems);

    // TODO:
    // Call your create album API here.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-4 text-white sm:p-6">

      {/* MAIN CONTAINER */}
      <div className="min-h-[85vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">

        <div className="flex flex-col gap-6 p-4 sm:p-6 lg:flex-row">

          {/* ===================================================== */}
          {/* LEFT SIDE - COVER ART */}
          {/* ===================================================== */}

          <label
            htmlFor="coverArt"
            className="
              group
              relative
              flex
              min-h-[400px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              gap-4
              overflow-hidden
              rounded-2xl
              border
              border-dashed
              border-amber-400/40
              bg-gradient-to-br
              from-amber-400/[0.04]
              to-transparent
              transition-all
              duration-300
              hover:border-amber-400
              hover:bg-amber-400/[0.07]
              hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]
              sm:min-h-[500px]
              lg:w-1/2
            "
          >

            {/* Background glow */}
            <div
              className="
                absolute
                h-40
                w-40
                rounded-full
                bg-amber-400/10
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-amber-400/20
              "
            />

            {coverArt ? (
              <>
                {/* Preview */}
                <img
                  src={URL.createObjectURL(coverArt)}
                  alt="Album cover preview"
                  className="
                    relative
                    h-64
                    w-64
                    rounded-2xl
                    object-cover
                    shadow-2xl
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

                <div className="relative text-center">
                  <p className="text-sm font-semibold text-zinc-200">
                    {coverArt.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Click to change cover art
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Upload icon */}
                <div
                  className="
                    relative
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-amber-400/30
                    bg-black/40
                    text-amber-400
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:border-amber-400/70
                  "
                >
                  <Upload size={32} />
                </div>

                <div className="relative text-center">
                  <p className="text-lg font-semibold text-zinc-200">
                    Drop your cover art here
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    PNG, JPG or WEBP
                  </p>

                  <p
                    className="
                      mt-4
                      inline-block
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-1.5
                      text-xs
                      text-zinc-400
                    "
                  >
                    Click to browse
                  </p>
                </div>
              </>
            )}

            <input
              id="coverArt"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleCoverArtChange}
            />
          </label>

          {/* ===================================================== */}
          {/* RIGHT SIDE */}
          {/* ===================================================== */}

          <div
            className="
              flex
              min-h-[500px]
              flex-col
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-4
              sm:p-6
              lg:w-1/2
            "
          >

            {/* Heading */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/80">
                Create Album
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Build your album
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Give your album a title and choose the music you want to add.
              </p>
            </div>

            {/* ================================================= */}
            {/* ALBUM TITLE */}
            {/* ================================================= */}

            <div className="mb-6">
              <label
                htmlFor="albumTitle"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Album title
              </label>

              <input
                id="albumTitle"
                type="text"
                placeholder="Enter album title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-3
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                  transition-all
                  duration-200
                  focus:border-amber-400/60
                  focus:bg-white/[0.07]
                  focus:ring-2
                  focus:ring-amber-400/10
                "
              />
            </div>

            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Add music
              </label>

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-2
                  transition-all
                  duration-200
                  focus-within:border-amber-400/40
                "
              >
                <SearchBar onSelect={handleSelect} />
              </div>
            </div>

            {/* ================================================= */}
            {/* SELECTED SONGS */}
            {/* ================================================= */}

            <div className="mt-6 flex-1">

              {selectedItems.length > 0 ? (
                <div
                  className="
                    rounded-2xl
                    border
                    border-amber-400/20
                    bg-gradient-to-br
                    from-amber-400/[0.08]
                    to-white/[0.02]
                    p-4
                    shadow-lg
                    shadow-black/20
                  "
                >

                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <Music2
                        size={15}
                        className="text-amber-400"
                      />

                      <p className="text-xs uppercase tracking-widest text-amber-400">
                        Selected tracks
                      </p>
                    </div>

                    <span
                      className="
                        rounded-full
                        border
                        border-amber-400/20
                        bg-amber-400/10
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-amber-400
                      "
                    >
                      {selectedItems.length}
                    </span>
                  </div>

                  {/* Songs */}
                  <div
                    className="
                      flex
                      max-h-[300px]
                      flex-col
                      gap-3
                      overflow-y-auto
                      pr-1
                    "
                  >

                    {selectedItems.map((item) => (
                      <div
                        key={item._id}
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        {/* Song card */}
                        <div className="min-w-0 flex-1">
                          <SearchCards
                            items={item}
                          />
                        </div>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          title="Remove track"
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            text-red-400
                            transition-all
                            duration-200
                            hover:scale-105
                            hover:border-red-500/40
                            hover:bg-red-500/20
                            hover:text-red-300
                            active:scale-95
                          "
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    ))}

                  </div>
                </div>

              ) : (

                /* EMPTY STATE */
                <div
                  className="
                    flex
                    min-h-[180px]
                    h-full
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-white/10
                    bg-white/[0.02]
                    px-6
                    text-center
                  "
                >

                  <div
                    className="
                      mb-4
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      text-zinc-500
                    "
                  >
                    <Music2 size={20} />
                  </div>

                  <p className="text-sm font-medium text-zinc-400">
                    No tracks selected
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    Search for songs above to add them to your album.
                  </p>

                </div>
              )}

            </div>

            {/* ================================================= */}
            {/* SUBMIT BUTTON */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                !title.trim() ||
                !coverArt ||
                selectedItems.length === 0
              }
              className="
                mt-6
                w-full
                rounded-xl
                bg-amber-400
                px-6
                py-3.5
                text-sm
                font-bold
                text-black
                shadow-lg
                shadow-amber-400/10
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-amber-300
                hover:shadow-amber-400/20
                active:translate-y-0
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:translate-y-0
              "
            >
              Create Album
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAlbum;