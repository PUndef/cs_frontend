const inverse = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  return imageData
}

export const renderInverse = (original: HTMLCanvasElement, target: HTMLCanvasElement) => {
  const ctx = original?.getContext("2d");
  const modCtx = target?.getContext("2d");
  if (ctx && modCtx) {
    const {width, height} = ctx.canvas;
    target.width = width;
    target.height = height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const inversedImageData = inverse(imageData)
    modCtx.putImageData(inversedImageData, 0, 0);
  }
}
