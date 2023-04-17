import { renderGrayscale } from "./grayscale";
import { renderInverse } from "./inverse";
import { uploadImage } from "./upload";

const canvas = <HTMLCanvasElement>document.getElementById('original');
const modifiedCanvas = <HTMLCanvasElement>document.getElementById('modified');
const uploadInput = <HTMLInputElement>document.getElementById('upload-image');
const inverseBtn = document.getElementById('inverse-btn');
const grayscaleBtn = document.getElementById('grayscale-btn');

const renderImage = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
  const ctx = canvas?.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx?.drawImage(img, 0, 0, img.width, img.height);
}

uploadInput?.addEventListener('change', (evt) => {
  uploadImage(evt).then((img: HTMLImageElement) => {
    renderImage(img, canvas)
  })
});

inverseBtn?.addEventListener('click', () => {
  renderInverse(canvas, modifiedCanvas);
})

grayscaleBtn?.addEventListener('click', () => {
  renderGrayscale(canvas, modifiedCanvas);
})