import { FC, useEffect, useState } from "react";
import { CircleStopIcon, PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import useStream from "../../hooks/useStream";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  pauseTimer,
  resetTimer,
  startTimer,
  tick,
  toggleTimer,
} from "../../redux/slices/timerSlice";
import {
  addScreenshot,
  deleteAllScreenshots,
} from "../../redux/slices/screenshotSlice";
import { formatTime } from "../../utils/formatTime";
import { streamHasEnded, streamIsActive } from "../../redux/slices/streamSlice";
import { captureScreenshot } from "../../utils/captureScreenshot";

const TimeMonitor: FC = () => {
  const { stream, endStream, requestStream } = useStream();
  const [isUserActive, setIsUserActive] = useState(false);
  const { seconds, isRunning } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  function handleClick() {
    if (stream?.active) return dispatch(toggleTimer());
    return requestStream();
  }

  function handleReset() {
    dispatch(resetTimer());
    endStream();
    dispatch(deleteAllScreenshots());
  }

  useEffect(() => {
    if (stream?.active) {
      dispatch(startTimer());
      dispatch(streamIsActive());
    } else {
      dispatch(streamHasEnded());
      dispatch(pauseTimer());
    }
  }, [stream, dispatch]);

  useEffect(() => {
    if (!isRunning) return;
    const timeoutId = setTimeout(() => {
      dispatch(tick());
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [seconds, isRunning, dispatch]);

  useEffect(() => {
    function handleActive() {
      if (!isRunning && !isUserActive && stream?.active) {
        dispatch(startTimer());
        setIsUserActive(true);
      }
    }
    window.addEventListener("keydown", handleActive);
    window.addEventListener("mousemove", handleActive);
    window.addEventListener("mousedown", handleActive);
    return () => {
      window.removeEventListener("keydown", handleActive);
      window.removeEventListener("mousemove", handleActive);
      window.removeEventListener("mousedown", handleActive);
    };
  }, [dispatch, isRunning, isUserActive, stream]);

  useEffect(() => {
    if (!isRunning) return;
    const timeoutId = setTimeout(() => {
      dispatch(pauseTimer());
      setIsUserActive(false);
    }, 10000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRunning, dispatch, isUserActive]);

  useEffect(() => {
    if (!stream?.active) return;
    if (!isRunning) return;
    const intervalId = setInterval(async () => {
      const screenshot = await captureScreenshot(stream.getVideoTracks()[0]);
      if (screenshot) dispatch(addScreenshot(screenshot));
      console.log("screenshot captured");
    }, 5000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [stream, dispatch, isRunning]);

  return (
    <div className="w-full flex justify-between mb-4">
      <div className="flex gap-3 font-bold justify-center text-green-800 items-center rounded-xl">
        <div className="flex items-center gap-3 border-green-700 border-2 py-1 px-3 rounded-full">
          <button title={isRunning ? "Pause" : "Start"} onClick={handleClick}>
            {isRunning ? (
              <PauseCircleIcon stroke="hsl(0, 80%, 60%)" />
            ) : (
              <PlayCircleIcon />
            )}
          </button>
          <p>{formatTime(seconds)}</p>
        </div>
        <button
          title="Reset"
          className="bg-red-700 rounded-full text-white"
          onClick={handleReset}
        >
          <CircleStopIcon />
        </button>
      </div>
      <p className="font-bold">
        Status:{" "}
        <span className={`${isRunning ? "text-green-700" : "text-red-700"}`}>
          {isRunning ? "Active" : "Inactive"}
        </span>
      </p>
    </div>
  );
};

export default TimeMonitor;
