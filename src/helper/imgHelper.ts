import { PixelCrop } from "react-image-crop";
import { useEffect, DependencyList } from "react";
import { IGenericActionParam, IGenericFormInputs, IGenericFormInputsDesc } from "../interface/generic";
const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as []);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}

export const makeActionArray = (data: IGenericFormInputs) => {
  if (typeof data === "undefined") return [];
  const arr: IGenericActionParam = [];
  if (data.id) {
    arr.push({ value: data.enName, key: "en" });
    if (data.arName) {
      arr.push({ value: data.arName, key: "ar" });
    }
  } else {
    arr.push({ value: data.enName, key: "en" });
    if (data.arName) {
      arr.push({ value: data.arName, key: "ar" });
    }
  }
  return arr;
};
export const makeActionArrayDescription = (data: IGenericFormInputsDesc) => {
  if (typeof data === "undefined") return [];
  const arr: IGenericActionParam = [];
  arr.push({ value: data.enDescription, key: "en" });
  arr.push({ value: data.arDescription, key: "ar" });
  return arr;
};
export const makeActionArrayValues = (data: any) => {
  if (typeof data === "undefined") return [];
  const variantsValue: any[] = [];

  data.values.forEach((obj: any) => {
    const arValue = obj.arValue;
    const enValue = obj.enValue;

    const variantObj: any = {
      value: [
        { key: "ar", value: arValue },
        { key: "en", value: enValue },
      ],
    };

    variantsValue.push(variantObj);
  });

  return variantsValue;
};
