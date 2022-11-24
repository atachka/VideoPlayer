import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";
import { MetaData } from "../../utils/types";

import "./Player.css";
interface Props {
  play: boolean;
  video: string;
  setPlay: (play: boolean) => void;
  setMetadata?: Dispatch<SetStateAction<MetaData>>;
  metaData: MetaData;
  videoRef: RefObject<HTMLVideoElement>;
  zoom: number;
}

export default function Player({
  play,
  video,
  setPlay,
  metaData,
  setMetadata,
  videoRef,
  zoom,
}: Props) {
  const [horizontal, setHorizontal] = useState(0);
  const prevX = useRef<number>(0);

  useEffect(() => {
    if (!videoRef.current) return;

    if (play) videoRef.current.play();
    else videoRef.current.pause();
  }, [play, videoRef]);

  // load overall duration
  useEffect(() => {
    if (!setMetadata) return;

    const callback = (e: Event) => {
      // name resolution frameRate codectype
      const target = e?.target as HTMLVideoElement;
      const duration = target?.duration;
      const width = target?.videoWidth;
      const height = target?.videoHeight;
      setPlay(false);
      setMetadata((prev: MetaData) => ({ ...prev, duration, width, height }));
    };

    videoRef?.current?.addEventListener("loadedmetadata", callback);
    return videoRef?.current?.addEventListener("loadedmetadata", callback);
  }, [videoRef, setMetadata, setPlay]);

  // track currentTime
  useEffect(() => {
    if (!setMetadata) return;

    const ontimeupdate = (event: Event) => {
      const target = event?.target as HTMLVideoElement;
      const currentTime = target.currentTime;
      setMetadata((prev) => ({ ...prev, currentTime }));
    };

    videoRef?.current?.addEventListener("timeupdate", ontimeupdate);
  }, [videoRef, setMetadata]);

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const left = prevX.current - mouseEvent.pageX;

      setHorizontal(left);
      prevX.current = mouseEvent.pageX;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return document.removeEventListener("mousemove", handleMouseMove);
  }, [horizontal]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.src = video;
  }, [video, videoRef]);

  return (
    <div className="player-container">
      <video
        id="video-player"
        ref={videoRef}
        className="video"
        style={{ transform: `scale(${zoom}) translate(${horizontal}%,${0}%)` }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
  );
}
