"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Réinitialise l'erreur avant chaque tentative

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Empêche la redirection automatique
    });

    if (!result?.ok) {
      setError("Email ou mot de passe incorrect."); // Message d'erreur
    } else {
      router.push("/"); // Redirige si la connexion réussit
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email :
          <input
            className="border-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link href="/inscription">Inscription</Link>
    </div>
  );
}
