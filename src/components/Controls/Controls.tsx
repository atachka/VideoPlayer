import "./Controls.css";
import { FormEvent, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { MetaData } from "../../utils/types";
import { FaPlus, FaMinus } from "react-icons/fa";
import { isValidVideoUrl, getNameFromURL } from "../../utils";

interface Props {
  play: boolean;
  setPlay: (play: boolean) => void;
  metaData: MetaData;
  handleCurrentTimeChange: (time: number) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  setVideo: (video: string) => void;
}

export default function Controls({
  play,
  setPlay,
  metaData,
  handleCurrentTimeChange,
  zoom,
  setZoom,
  setVideo,
}: Props) {
  const { currentTime, duration } = metaData;
  const [videoName, setVideoName] = useState<String>("Default Video");
  const handleTimelineClick = (e: FormEvent<HTMLDivElement> | MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const mouseEvent = e as MouseEvent;
    const width = target.getBoundingClientRect().width;
    const left = target.getBoundingClientRect().left;
    const point = mouseEvent.clientX - left;

    const percentage = (point / width) * 100;

    const calculatedPoint = (duration * percentage) / 100;

    handleCurrentTimeChange(calculatedPoint);
  };

  const handleRemoteVideo = async (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = getNameFromURL(target.value);
    const isValidUrl = await isValidVideoUrl(target.value);

    if (isValidUrl) {
      setVideoName(name);
      setVideo(target.value);
      return;
    }

    return;
  };
  return (
    <div className="controls-container">
      <div className="metadata">
        <div>
          <span>
            Dimensions: {metaData.width} {metaData.height}
          </span>
        </div>
        <div>
          {" "}
          <span>Dimensions: {videoName}</span>
        </div>
      </div>
      <div className="timeline" onClick={handleTimelineClick}>
        <div
          className="timeline-progress"
          style={{
            width: currentTime ? `${(currentTime / duration) * 100}%` : "0%",
          }}
        ></div>
      </div>
      <div className="controls-items">
        <div className="controls-item" onClick={() => setPlay(!play)}>
          {play ? <FaPauseCircle /> : <FaPlay />}
        </div>

        <div className="controls-item controls-item-time">
          {duration.toFixed(2)} : {currentTime.toFixed(2)}
        </div>
      </div>
      <div className="player-zoom">
        <div className="player-zoom-item" onClick={() => setZoom(zoom + 0.5)}>
          <FaPlus />
        </div>
        <div
          className="player-zoom-item"
          onClick={() => {
            if (zoom === 1) setZoom(1);
            setZoom(zoom - 0.5);
          }}
        >
          <FaMinus />
        </div>
        <div className="input-container">
          <input
            name="url"
            placeholder="enter remote video url"
            onChange={handleRemoteVideo}
          />
        </div>
      </div>
    </div>
  );
}
