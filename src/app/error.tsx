"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-6">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-extrabold mb-3">Algo deu errado</h2>
        <p className="text-neutral-500 text-sm mb-6">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <button
          onClick={reset}
          className="bg-brand-ciano text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
