import { useState } from "react";
import { useSession } from "next-auth/react";

type ProfileData = {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
};

export function useProfile() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (data: ProfileData) => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      await update(data);
      setSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil");
    }
  };

  return {
    isEditing,
    setIsEditing,
    updateProfile,
    error,
    success,
  };
}
