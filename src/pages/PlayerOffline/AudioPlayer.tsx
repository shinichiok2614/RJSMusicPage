import { useEffect, useRef, useState } from "react";
import "./index.css";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

// interface AudioPlayerProps {
//   selectedSong: ISong | undefined;
// }
const AudioPlayer = ({trackIndex,setTrackIndex,tracksOffline}:any) => {
  // states
  // const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(
    tracksOffline[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracksOffline.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracksOffline[0]);
    } else {
      setTrackIndex((prev: number) => prev + 1);
      setCurrentTrack(tracksOffline[trackIndex + 1]);
    }
  };

  useEffect(()=>{
    setCurrentTrack(tracksOffline[trackIndex]);
  },[trackIndex])

  return (
    <>
      <div className="audio-player">
        <DisplayTrack
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressBarRef,
            handleNext,
          }}
        />
        <div className="inner">
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracksOffline,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
