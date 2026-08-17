import { Download, Trash2 } from "lucide-react";
import type { GalleryImage } from "../../types/GalleryImage";

import "./GalleryCard.css";

interface GalleryCardProps {
  item: GalleryImage;
  onClick: () => void;
  onDelete: () => void;
  onDownload: () => void;
}

function GalleryCard({
  item,
  onClick,
  onDelete,
  onDownload,
}: GalleryCardProps) {
  return (
    <div className="gallery-card" onClick={onClick}>
      <img
        src={item.image}
        alt="Imagen de galería"
      />

      <div className="gallery-card-actions">
        <button
          className="gallery-action-button"
          onClick={(event) => {
            event.stopPropagation();
            onDownload();
          }}
          title="Descargar PDF"
        >
          <Download size={20} />
        </button>

        <button
          className="gallery-action-button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          title="Eliminar"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default GalleryCard;