"use client";

import NavbarAuth from "@/app/components/NavbarAuth/NavbarAuth";
import NavbarClient from "@/app/components/NavbarClient/NavbarClient";
import Footer from "@/app/components/Footer/Footer";
import SidebarAuth from "@/app/components/SidebarAuth/SidebarAuth";

export default function CGVPage() {
  return (
    <>
      <NavbarAuth />
      <NavbarClient />
      <main className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Conditions Générales de Vente</h1>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Objet</h2>
              <div className="prose prose-gray">
                <p>
                  Les présentes conditions générales de vente régissent les relations entre 
                  Drive Market et ses clients dans le cadre de la vente de produits alimentaires 
                  via notre plateforme de drive.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Prix</h2>
              <div className="prose prose-gray">
                <p>
                  Les prix sont indiqués en euros TTC. Drive Market se réserve le droit 
                  de modifier ses prix à tout moment. Les produits seront facturés sur la 
                  base des tarifs en vigueur au moment de la validation de la commande.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Commandes</h2>
              <div className="prose prose-gray">
                <p>
                  La commande ne sera définitive qu'après confirmation du paiement. 
                  Drive Market se réserve le droit de refuser une commande en cas 
                  d'indisponibilité des produits ou de litige antérieur avec le client.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Livraison</h2>
              <div className="prose prose-gray">
                <p>
                  Les produits sont à retirer au drive aux horaires indiqués lors de 
                  la commande. Le client s'engage à venir chercher sa commande dans 
                  le créneau horaire choisi.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <SidebarAuth />
    </>
  );
}