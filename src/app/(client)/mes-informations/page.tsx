"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useProfile } from "@/app/hooks/useProfile";
import { FaUser, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { NavbarAuth, NavbarClient, SidebarAuthentification } from "@/app/components";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function MesInformations() {
  const { data: session } = useSession();
  const { isEditing, setIsEditing, updateProfile, error, success } = useProfile();

  const [formData, setFormData] = useState({
    firstname: session?.user?.firstname || "",
    lastname: session?.user?.lastname || "",
    address: session?.user?.address || "",
    email: session?.user?.email || "",
    phoneNumber: session?.user?.phoneNumber || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (!session) return <LoadingSpinner />;

  return (
    <>
      <NavbarAuth />
      <NavbarClient />
      <SidebarAuthentification />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <FaUser className="text-white w-7 h-7" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">Mes Informations</h1>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200 text-lg"
                  >
                    <FaEdit className="w-5 h-5" />
                    <span>Modifier</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200 text-lg"
                  >
                    <FaTimes className="w-5 h-5" />
                    <span>Annuler</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center text-lg">
                  <span className="flex-1">{error}</span>
                </div>
              )}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center text-lg">
                  <span className="flex-1">Profil mis à jour avec succès !</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Prénom
                      <input
                        type="text"
                        value={formData.firstname}
                        onChange={(e) =>
                          setFormData({ ...formData, firstname: e.target.value })
                        }
                        disabled={!isEditing}
                        className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500 text-lg py-3 px-4"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Nom
                      <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) =>
                          setFormData({ ...formData, lastname: e.target.value })
                        }
                        disabled={!isEditing}
                        className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500 text-lg py-3 px-4"
                      />
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Adresse
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        disabled={!isEditing}
                        className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500 text-lg py-3 px-4"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Email
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm bg-gray-50 text-gray-500 text-lg py-3 px-4"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Téléphone
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, phoneNumber: e.target.value })
                        }
                        disabled={!isEditing}
                        className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500 text-lg py-3 px-4"
                      />
                    </label>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors duration-200 shadow-md text-lg"
                    >
                      <FaSave className="w-5 h-5" />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
