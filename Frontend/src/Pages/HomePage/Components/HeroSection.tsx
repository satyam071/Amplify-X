import  { useEffect, useState } from "react";
import hero_image from "../../../Images/cdd20-mountains-6839521.jpg"


const words = ["MUSIC", "STREAM", "RELEASE"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Word completely typed
    if (!isDeleting && displayText === currentWord) {
      const pause = setTimeout(() => {
        setIsDeleting(true);
      }, 5000);

      return () => clearTimeout(pause);
    }

    // Word completely deleted
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const typingSpeed = isDeleting ? 100 : 180;

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentWord.substring(0, displayText.length - 1)
          : currentWord.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <div
      className="relative min-h-[90vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${hero_image})`,
      }}
    >
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end gap-6 p-6 text-white sm:p-8 md:p-10 lg:flex-row lg:items-end lg:justify-between">

        {/* Heading */}
        <h1
          className="
        font-bodoni
        text-left
        text-[clamp(3.5rem,12vw,10rem)]
        leading-[0.85]
        break-words
        max-w-full
        lg:max-w-[70%]
      "
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Button + description */}
        <div className="flex flex-col items-start gap-2 pb-1 lg:max-w-[30%] lg:items-end lg:text-right">
          <button
            className="
          cursor-pointer
          rounded-full
          border
          px-5 py-2
          text-[clamp(0.9rem,2vw,1.5rem)]
          transition-all
          duration-300
          hover:text-pink-500
        "
          >
            Create Release
          </button>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            Your music. Your sound. Your platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;