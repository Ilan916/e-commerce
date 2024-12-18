"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

// Import des icônes
import { FaArrowLeft } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full min-h-screen grid md:grid-cols-10">
      {/* Section Image */}
      <div className="hidden md:block col-span-3">
        <Image
          src="/assets/connexion-img.jpg"
          width={500}
          height={750}
          alt="Picture of the author"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Section Formulaire */}
      <div className="col-span-7 flex flex-col w-full">
        {/* Grid Layout pour la section formulaire */}
        <div className="grid grid-rows-[auto_1fr] h-full">
          {/* Header */}
          <header className="w-full flex items-center justify-between py-4 px-8">
            {/* Flèche retour */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-gray-600 hover:text-black transition"
            >
              <FaArrowLeft />
            </button>

            {/* Logo */}
            <h1 className="text-xl font-bold text-red-600">PickUp Market</h1>

            {/* Sécurisé */}
            <div className="flex text-[12px] flex-col justify-start text-gray-600">
              <div className="flex items-center space-x-1">
                <span>Espace</span>
                <FaLock />
              </div>
              <span className="text-green-600 font-semibold">100% sécurisé</span>
            </div>
          </header>

          {/* Contenu formulaire (centré dans la zone restante) */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-8 w-full pb-24">
              <h1 className="text-3xl text-slate-800 font-bold mb-4">Se connecter</h1>
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <div className="relative group">
                  <label
                    className="block text-slate-800 font-medium group-focus-within:text-red-600"
                  >
                    E-mail :
                    <input
                      className="w-full h-12 mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 autofill:shadow-[inset_0_0_0px_100px_white]"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="relative group">
                  <label
                    className="block text-slate-800 font-medium group-focus-within:text-red-600"
                  >
                    Mot de passe :
                    <input
                      className="w-full h-12 mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 autofill:shadow-[inset_0_0_0px_100px_white]"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  Se connecter
                </button>
              </form>
              {error && <p className="mt-4 text-red-500">{error}</p>}

              {/* Bouton "Se créer un compte" en secondary */}
              <Link
                href="/inscription"
                className="max-w-md w-full mt-4 py-2 px-4 border border-red-600 text-red-600 font-semibold rounded-lg text-center hover:bg-red-50 transition"
              >
                Se créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
