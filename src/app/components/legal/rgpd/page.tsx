"use client";

import NavbarAuth from "@/app/components/NavbarAuth/NavbarAuth";
import NavbarClient from "@/app/components/NavbarClient/NavbarClient";
import Footer from "@/app/components/Footer/Footer";
import SidebarAuth from "@/app/components/SidebarAuth/SidebarAuth";

export default function RGPDPage() {
  return (
    <>
      <NavbarAuth />
      <NavbarClient />
      <main className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Protection des Données Personnelles</h1>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Données collectées</h2>
              <div className="prose prose-gray">
                <p className="mb-4">Nous collectons les données suivantes :</p>
                <ul className="list-disc pl-6">
                  <li>Données d'identification (nom, prénom, email)</li>
                  <li>Données de livraison (adresse)</li>
                  <li>Données de paiement (sécurisées)</li>
                  <li>Données de navigation</li>
                  <li>Historique des commandes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Utilisation des données</h2>
              <div className="prose prose-gray">
                <ul className="list-disc pl-6">
                  <li>Gestion de votre compte client</li>
                  <li>Traitement de vos commandes</li>
                  <li>Amélioration de nos services</li>
                  <li>Personnalisation de votre expérience</li>
                  <li>Communications marketing (avec votre consentement)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Vos droits</h2>
              <div className="prose prose-gray">
                <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>
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