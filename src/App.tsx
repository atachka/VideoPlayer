import { useRef, useState } from "react";
import "./App.css";
import Controls from "./components/Controls/Controls";
import Player from "./components/player/Player";
import videoUrl from "./assets/video/video.mp4";
import { MetaData } from "./utils/types";

function App() {
  const [play, setPlay] = useState<boolean>(false);
  const [video, setVideo] = useState<string>(videoUrl);
  const [metaData, setMetaData] = useState<MetaData>({
    duration: 0,
    currentTime: 0,
  });
  const [zoom, setZoom] = useState<number>(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const handleCurrentTimeChange = (time: number) => {
    if (!videoRef.current) return;
    if (!videoRef2.current) return;

    videoRef.current.currentTime = time;
    videoRef2.current.currentTime = time;
    setMetaData((prev) => ({ ...prev, currentTime: time }));
  };

  return (
    <div className="App">
      <div className="video-players">
        <Player
          setPlay={setPlay}
          videoRef={videoRef}
          play={play}
          video={video}
          metaData={metaData}
          setMetadata={setMetaData}
          zoom={zoom}
        />
        <Player
          setPlay={setPlay}
          videoRef={videoRef2}
          play={play}
          video={video}
          metaData={metaData}
          zoom={zoom}
        />
      </div>

      <Controls
        play={play}
        setPlay={setPlay}
        setVideo={setVideo}
        metaData={metaData}
        handleCurrentTimeChange={handleCurrentTimeChange}
        zoom={zoom}
        setZoom={setZoom}
      />
    </div>
  );
}

export default App;
