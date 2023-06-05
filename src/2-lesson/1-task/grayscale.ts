const grayscale = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  return imageData
}

export const renderGrayscale = (original: HTMLCanvasElement, target: HTMLCanvasElement) => {
  const origCtx = original?.getContext("2d");
  const modCtx = target?.getContext("2d");
  if (origCtx && modCtx) {
    const {width, height} = origCtx.canvas;
    const imageData = origCtx.getImageData(0, 0, width, height);
    // Set size in modified canvas as in original canvas
    target.width = width;
    target.height = height;
    const grayscaledData = grayscale(imageData)
    modCtx.putImageData(grayscaledData, 0, 0);
  }
};
