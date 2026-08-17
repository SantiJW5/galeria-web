import { Plus } from "lucide-react";
import "./AddImageCard.css";

interface AddImageCardProps {
  onClick: () => void;
}

function AddImageCard({ onClick }: AddImageCardProps) {
  return (
    <button className="add-image-card" onClick={onClick}>
      <Plus size={48} />
      <span>Agregar imagen</span>
    </button>
  );
}

export default AddImageCard;