export default function NewsletterSection() {
  return (
    <div className="bg-gray-100 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Titre */}
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-600 sm:text-4xl lg:col-span-7">
          Ne manquez aucune promotion ! Inscrivez-vous à notre newsletter.
        </h2>

        {/* Formulaire d'inscription */}
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Entrez votre e-mail"
              autoComplete="email"
              className="min-w-0 border-2 border-slate-600 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-slate-600/75 placeholder:font-bold focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              S'inscrire
            </button>
          </div>
          <p className="mt-4 text-sm/6 text-slate-600">
            Nous respectons votre vie privée. Consultez notre{' '}
            <a href="#" className="font-semibold text-slate-800 hover:text-red-600">
              politique de confidentialité
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
