import React, { useState } from "react";
import { createRelease } from "../Api/post.music";

const CreateRelease = () => {
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [release, setRelease] = useState({
    title: "",
    coverArt: null as File | null,
    musicFile: null as File | null,
  });
  const createAgain = () => {
    setIsUploaded(false);
    setRelease({
      title: "",
      coverArt: null,
      musicFile: null

    })

  }

  const handleCoverArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setRelease((prev) => ({
      ...prev,
      coverArt: file,
    }));
  };

  const handleMusicFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setRelease((prev) => ({
      ...prev,
      musicFile: file,
    }));
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRelease((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log(release);
    setIsLoading(true);

    try {

      const data = await createRelease(release);
      setIsUploaded(true)
      console.log(data);
      setIsLoading(false);




    } catch (error) {
      alert("An error occured")
      setIsUploaded(false)
      setIsLoading(false);



    }






    // release = {
    //   title: "...",
    //   coverArt: File,
    //   musicFile: File
    // }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-10 text-white">
      {isUploaded ? (
        <div className="min-h-screen flex items-center justify-center bg-black text-white transition-all ease-in-out delay-500">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-12 py-10 text-center shadow-2xl backdrop-blur-md">
            <div className="mb-4 text-5xl">✓</div>

            <h1 className="text-3xl font-semibold text-amber-400">
              Music Uploaded!
            </h1>

            <p className="mt-3 text-gray-400">
              Your music has been successfully uploaded.
            </p>
            <button
              onClick={() => { createAgain() }}
              className="mt-3 rounded text-black bg-amber-400 p-3 cursor-pointer">
              Upload More
            </button>
          </div>
        </div>
      ) : (<div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-amber-400">
            AMPLIFY-X
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Create a new release
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Upload your music and give your release a name.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

          <div className="grid gap-8 lg:grid-cols-2">

            {/* LEFT — COVER ART */}
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                Cover Art
              </h2>

              <p className="mb-4 text-sm text-gray-400">
                Upload an image for your release.
              </p>

              <label
                htmlFor="coverArt"
                className="group flex aspect-square max-w-md cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-black/20 transition-all duration-300 hover:border-amber-400/60 hover:bg-white/5"
              >
                {release.coverArt ? (
                  <img
                    src={URL.createObjectURL(release.coverArt)}
                    alt="Cover preview"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <>
                    <div className="mb-4 text-5xl text-gray-500 transition group-hover:text-amber-400">
                      +
                    </div>

                    <p className="font-medium">
                      Upload cover art
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG or WEBP
                    </p>
                  </>
                )}
              </label>

              <input
                id="coverArt"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleCoverArt}
              />
            </div>

            {/* RIGHT — DETAILS */}
            <div className="flex flex-col gap-8">

              {/* TITLE */}
              <div>
                <h2 className="mb-2 text-xl font-semibold">
                  Details
                </h2>

                <label className="mb-2 block text-sm text-gray-300">
                  Release title
                </label>

                <input
                  type="text"
                  value={release.title}
                  onChange={handleTitle}
                  placeholder="Enter your song title"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              {/* MUSIC UPLOAD */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Music file
                </label>

                <label
                  htmlFor="musicFile"
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-white/20 bg-black/20 p-5 transition hover:border-amber-400/60"
                >
                  <div>
                    <p className="font-medium">
                      {release.musicFile
                        ? release.musicFile.name
                        : "Upload your music"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      MP3, WAV or FLAC
                    </p>
                  </div>

                  <span className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black">
                    Browse
                  </span>
                </label>

                <input
                  id="musicFile"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleMusicFile}
                />
              </div>

              {/* SUMMARY */}
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="mb-3 text-sm font-medium text-gray-300">
                  Release summary
                </p>

                <div className="space-y-2 text-sm text-gray-400">
                  <p>
                    <span className="text-white">Title:</span>{" "}
                    {release.title || "Not added"}
                  </p>

                  <p>
                    <span className="text-white">Cover:</span>{" "}
                    {release.coverArt?.name || "Not added"}
                  </p>

                  <p>
                    <span className="text-white">Music:</span>{" "}
                    {release.musicFile?.name || "Not added"}
                  </p>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-auto w-full rounded-xl bg-amber-400 py-3 font-semibold text-black transition hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20 active:scale-[0.98]"
              >
                {isLoading ? (<div className="flex items-center justify-center gap-1 text-black">
                  <span>Uploading</span>
                  <span className="animate-bounce [animation-delay:-0.3s]">.</span>
                  <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                  <span className="animate-bounce">.</span>
                </div>) : ("Create Release")}
              </button>

            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default CreateRelease;