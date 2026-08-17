import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { GalleryImage } from "../../types/GalleryImage";

import "./AddImageModal.css";

interface AddImageModalProps {
  onClose: () => void;
  onSave: (image: GalleryImage) => void;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;

function AddImageModal({ onClose, onSave }: AddImageModalProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [text, setText] = useState("");

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("El archivo seleccionado no es una imagen.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("La imagen no puede pesar más de 2 MB.");
      return false;
    }

    return true;
  };

  const convertFileToBase64 = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    convertFileToBase64(file);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;

      if (!items) {
        return;
      }

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();

          if (file) {
            convertFileToBase64(file);
          }

          break;
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("paste", handlePaste);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSave = () => {
    if (!selectedImage) {
      alert("Selecciona o pega una imagen.");
      return;
    }

    const newImage: GalleryImage = {
      id: crypto.randomUUID(),
      image: selectedImage,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    onSave(newImage);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-container"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2>Agregar imagen</h2>

        <div className="modal-content">
          <div className="image-section">
            <label
              htmlFor="image-input"
              className="image-selector"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Vista previa"
                  className="image-preview"
                />
              ) : (
                <div className="image-placeholder">
                  <span>Seleccionar imagen</span>

                  <small>
                    o pega una imagen con Ctrl + V
                  </small>

                  <small>
                    Máximo 2 MB
                  </small>
                </div>
              )}
            </label>

            <input
              id="image-input"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </div>

          <div className="text-section">
            <textarea
              placeholder="Escribe un texto para esta imagen..."
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
            />
          </div>
        </div>

        <button
          className="save-button"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default AddImageModal;