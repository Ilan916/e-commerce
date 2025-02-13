export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-red-600 animate-spin"></div>
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-red-400 animate-spin absolute top-4 left-4"></div>
      </div>
      <h2 className="mt-8 text-2xl font-semibold text-gray-700 animate-pulse">
        Chargement...
      </h2>
      <p className="mt-2 text-gray-500">Veuillez patienter</p>
    </div>
  );
}
