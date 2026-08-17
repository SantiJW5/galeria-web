import type { GalleryImage } from "../types/GalleryImage";

const STORAGE_KEY = "gallery-images";

export function getGalleryImages(): GalleryImage[] {
  const savedImages = localStorage.getItem(STORAGE_KEY);

  if (!savedImages) {
    return [];
  }

  return JSON.parse(savedImages);
}

export function saveGalleryImages(images: GalleryImage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
}