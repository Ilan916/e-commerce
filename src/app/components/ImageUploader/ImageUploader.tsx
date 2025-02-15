"use client";
import { useState } from "react";

interface ImageUploaderProps {
  onImageUpload: (image: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 📌 Limite de 2MB
      setError("L'image est trop lourde (max 2MB).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onImageUpload(base64String); // 📌 Envoie l'image en base64
      setError(null); // Réinitialise l'erreur
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      document.getElementById('fileInput')?.click();
    }
  };

  return (
    <div 
      className="flex flex-col items-center gap-4 border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer"
      onDragOver={(e) => e.preventDefault()} // Permet le drop
      onDrop={handleDrop} // Gère le drop
      aria-label="Zone de téléchargement d'image"
    >
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
        id="fileInput" 
        aria-label="Sélectionner une image"
      />
      <label 
        htmlFor="fileInput" 
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        tabIndex={0} // Rendre le label focusable
        onKeyDown={handleKeyDown} // Gérer la touche Entrée et Espace
      >
        Choisir une image ou glisser-déposer
      </label>

      {error && <p className="text-red-500">{error}</p>}

      {preview && <img src={preview} alt="Aperçu" className="w-64 h-64 object-cover rounded shadow-md" />}
    </div>
  );
}
