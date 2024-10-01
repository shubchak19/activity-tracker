import { useCallback, useEffect, useState } from "react";

export default function useStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const endStream = useCallback(() => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setStream(null);
  }, [stream]);

  useEffect(() => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.addEventListener("ended", () => endStream());

    return () => {
      endStream();
      videoTrack.removeEventListener("ended", () => endStream());
    };
  }, [endStream, stream]);

  const requestStream = useCallback(async () => {
    if (stream) return;
    try {
      const newStream = await navigator.mediaDevices.getDisplayMedia();
      setStream(newStream);
    } catch (error) {
      console.log(error);
    }
  }, [stream]);

  return { endStream, requestStream, stream };
}
