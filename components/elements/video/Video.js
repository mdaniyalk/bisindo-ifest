import { RenderIf } from "../RenderIf";
import { HiPlay } from "react-icons/hi";
import { useRef, useState } from "react";
import clsx from "clsx";

export function Video({ src, label }) {
  const videoRef = useRef();

  const [isPlayed, setIsPlayed] = useState(false);

  const clickHandler = () => {
    if (!isPlayed) {
      setIsPlayed(true);
      videoRef.current.play();
    } else {
      setIsPlayed(false);
      videoRef.current.pause();
    }
  };

  return (
    <div>
      <div role="button" className="relative isolate" onClick={clickHandler}>
        <video
          loop
          ref={videoRef}
          className="shadow-xl rounded-xl aspect-video object-cover object-center"
        >
          <source src={src} />
        </video>
        <HiPlay
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow duration-150",
            isPlayed ? "w-0 h-0 opacity-10" : "w-full h-[40%] opacity-75",
          )}
        />
      </div>
      <RenderIf when={label}>
        <div className="mt-2 font-medium text-center capitalize">{label}</div>
      </RenderIf>
    </div>
  );
}
