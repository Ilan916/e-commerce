import { FaTruck, FaStoreAlt, FaShoppingBag } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";

export default function ServicesInfos() {
  const services = [
    {
      icon: <FaTruck className="text-white w-10 h-10" />,
      title: "Livraison à domicile",
      description:
        "Vos courses du quotidien, vos équipements Maison & Loisirs ou votre caddie, livrés chez vous, même au 5ème étage !",
      bgColor: "bg-red-600",
    },
    {
      icon: <MdOutlinePointOfSale className="text-white w-10 h-10" />,
      title: "Click & Collect",
      description:
        "Faites vos achats en ligne en quelques clics, choisissez votre créneau et récupérez votre commande en point de retrait ou en magasin.",
      bgColor: "bg-red-600",
    },
    {
      icon: <FaShoppingBag className="text-white w-10 h-10" />,
      title: "Drive",
      description:
        "Vos courses dans votre coffre en moins de 5min ! Faites vos achats en ligne, choisissez votre créneau et retirez-les gratuitement.",
      bgColor: "bg-red-600",
    },
    {
      icon: <FaStoreAlt className="text-white w-10 h-10" />,
      title: "Magasin",
      description:
        "Trouvez le magasin le plus proche pour profiter de nos produits et services à prix Drive Market.",
      bgColor: "bg-red-600",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-slate-800 font-bold text-center mb-8">
          Faire vos courses avec Drive Market, rien de plus facile !
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Vous venez chercher vos courses ou nous les livrons chez vous ? Découvrez toutes les
          manières de faire vos achats chez Drive Market.
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} text-white p-8 rounded-lg flex flex-col items-center`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-sm text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
