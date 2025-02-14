"use client";

import { useState } from "react";
import Link from "next/link";

export default function Inscription() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          dateOfBirth,
          phoneNumber,
          address,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue.");
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/inscription-img.jpg')" }}
    >
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 bg-opacity-95 backdrop-blur-lg">
        <h1 className="text-3xl text-slate-800 font-bold text-center mb-6">
          Créer un compte
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Prénom */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium">
              Prénom :
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
                required
              />
            </label>
          </div>

          {/* Nom */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium">
              Nom :
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
                required
              />
            </label>
          </div>

          {/* Email */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium">
              Email :
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
                required
              />
            </label>
          </div>

          {/* Mot de passe */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium">
              Mot de passe :
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
                required
              />
            </label>
          </div>

          {/* Date de naissance */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium">
              Date de naissance :
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
                required
              />
            </label>
          </div>

          {/* Numéro de téléphone */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium">
              Numéro de téléphone :
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
                required
              />
            </label>
          </div>

          {/* Adresse */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium">
              Adresse :
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
                required
              />
            </label>
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            S&apos;inscrire
          </button>
        </form>

        {/* Erreur ou succès */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-600 text-center">Inscription réussie !</p>
        )}

        {/* Lien de connexion */}
        <p className="text-center mt-4 text-gray-600">
          Déjà un compte ?{" "}
          <Link
            href="/connexion"
            className="text-red-600 hover:underline font-semibold"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
