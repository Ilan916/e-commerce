"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      router.push("/connexion");
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
        <h1 className="text-3xl text-gray-900 font-bold text-center mb-6">
          Créer un compte
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire d'inscription">
          {/* Prénom */}
          <div className="relative group">
            <label htmlFor="firstname" className="block text-gray-700 font-medium">
              Prénom :
            </label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
              required
              aria-label="Prénom"
            />
          </div>

          {/* Nom */}
          <div className="relative group">
            <label htmlFor="lastname" className="block text-gray-700 font-medium">
              Nom :
            </label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
              required
              aria-label="Nom"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email :
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
              required
              aria-label="Email"
            />
          </div>

          {/* Mot de passe */}
          <div className="relative group">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Mot de passe :
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
              required
              aria-label="Mot de passe"
            />
          </div>

          {/* Date de naissance */}
          <div className="relative group">
            <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium">
              Date de naissance :
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
              required
              aria-label="Date de naissance"
            />
          </div>

          {/* Numéro de téléphone */}
          <div className="relative group">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium">
              Numéro de téléphone :
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
              required
              aria-label="Numéro de téléphone"
            />
          </div>

          {/* Adresse */}
          <div className="relative group">
            <label htmlFor="address" className="block text-gray-700 font-medium">
              Adresse :
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="autofill:shadow-[inset_0_0_0px_100px_white] w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-white autofill:bg-white"
              required
              aria-label="Adresse"
            />
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            aria-label="S'inscrire"
          >
            S&apos;inscrire
          </button>
        </form>

        {/* Erreur ou succès */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-700 text-center">Inscription réussie !</p>
        )}

        {/* Lien de connexion */}
        <p className="text-center mt-4 text-gray-600">
          Déjà un compte ?{" "}
          <Link
            href="/connexion"
            className="text-red-600 hover:underline font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            aria-label="Se connecter"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
