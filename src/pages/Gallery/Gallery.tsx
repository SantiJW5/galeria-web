import { useEffect, useState } from "react";

import AddImageCard from "../../components/AddImageCard/AddImageCard";
import AddImageModal from "../../components/AddImageModal/AddImageModal";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import ImageDetailModal from "../../components/ImageDetailModal/ImageDetailModal";

import type { GalleryImage } from "../../types/GalleryImage";

import {
  getGalleryImages,
  saveGalleryImages,
} from "../../utils/localStorage";

import { generateImagePdf } from "../../utils/generatePdf";

import "./Gallery.css";

function Gallery() {
  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [images, setImages] =
    useState<GalleryImage[]>([]);

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  useEffect(() => {
    const savedImages = getGalleryImages();
    setImages(savedImages);
  }, []);

  const handleSaveImage = (
    newImage: GalleryImage
  ) => {
    const updatedImages = [
      ...images,
      newImage,
    ];

    setImages(updatedImages);

    saveGalleryImages(updatedImages);
  };

  const handleDeleteImage = (
    id: string
  ) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta imagen?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedImages = images.filter(
      (image) => image.id !== id
    );

    setImages(updatedImages);

    saveGalleryImages(updatedImages);
  };

  const handleDownloadImage = (
    item: GalleryImage
  ) => {
    generateImagePdf(item);
  };

  return (
    <main className="gallery-page">
      <h1>Mi Galería</h1>

      <div className="gallery-grid">
        <AddImageCard
          onClick={() =>
            setIsAddModalOpen(true)
          }
        />

        {images.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            onClick={() =>
              setSelectedImage(item)
            }
            onDelete={() =>
              handleDeleteImage(item.id)
            }
            onDownload={() =>
              handleDownloadImage(item)
            }
          />
        ))}
      </div>

      {isAddModalOpen && (
        <AddImageModal
          onClose={() =>
            setIsAddModalOpen(false)
          }
          onSave={handleSaveImage}
        />
      )}

      {selectedImage && (
        <ImageDetailModal
          item={selectedImage}
          onClose={() =>
            setSelectedImage(null)
          }
        />
      )}
    </main>
  );
}

export default Gallery;