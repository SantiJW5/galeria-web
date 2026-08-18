import { useEffect, useState } from "react";
import { Copy, Check, X } from "lucide-react";

import type { GalleryImage } from "../../types/GalleryImage";

import "./ImageDetailModal.css";

interface ImageDetailModalProps {
  item: GalleryImage;
  onClose: () => void;
}

function ImageDetailModal({
  item,
  onClose,
}: ImageDetailModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(item.text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("No se pudo copiar el texto:", error);
    }
  };

  return (
    <div
      className="detail-overlay"
      onClick={onClose}
    >
      <div
        className="detail-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="detail-actions">
          <button
            className="detail-copy"
            onClick={handleCopyText}
            title="Copiar texto"
          >
            {copied ? (
              <Check size={22} />
            ) : (
              <Copy size={22} />
            )}
          </button>

          <button
            className="detail-close"
            onClick={onClose}
            title="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="detail-content">
          <div className="detail-image-section">
            <img
              src={item.image}
              alt="Imagen guardada"
            />
          </div>

          <div className="detail-text-section">
            <h2>Descripción</h2>

            <p>
              {item.text || "Esta imagen no tiene texto."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetailModal;