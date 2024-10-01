export async function captureScreenshot(stream: MediaStreamTrack) {
  if (!stream) return;
  const screen = new ImageCapture(stream);
  const bitmap = await screen.grabFrame();
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (context) {
    context.drawImage(bitmap, 0, 0);
    const imageUrl = canvas.toDataURL("image/jpeg", 0.5);
    const timeStamp = new Date().toISOString();
    return { imageUrl, timeStamp };
  }
}
