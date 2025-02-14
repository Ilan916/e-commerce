export const metadata = {
    title: 'Mentions Légales - Drive Market',
    description: 'Mentions légales de Drive Market'
  }
  
  export default function MentionsLegales() {
    return (
      <main className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Mentions Légales</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Éditeur du site</h2>
              <div className="prose prose-gray">
                <p>
                  Le site Drive Market est édité par la société Drive Market, SAS au capital 
                  de [1500] euros, immatriculée au RCS de [Paris] sous le numéro [123456789].
                </p>
                <p className="mt-4">
                  <strong>Siège social :</strong><br />
                  [Rue boileau, 75016 Paris]
                </p>
                <p className="mt-4">
                  <strong>Contact :</strong><br />
                  Téléphone : [0123456789]<br />
                  Email : contact@drivemarket.fr
                </p>
              </div>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Hébergement</h2>
              <div className="prose prose-gray">
                <p>
                  Le site est hébergé par [hostinger]<br />
                  [hostinger ]
                </p>
              </div>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Propriété intellectuelle</h2>
              <div className="prose prose-gray">
                <p>
                  L'ensemble du contenu du site Drive Market (logo, textes, graphismes, 
                  images, photos, vidéos...) est protégé par le droit d'auteur. Toute 
                  reproduction partielle ou totale de ce contenu est strictement interdite 
                  sauf autorisation expresse de Drive Market.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }