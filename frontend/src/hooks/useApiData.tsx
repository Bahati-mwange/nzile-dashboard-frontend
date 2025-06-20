import { useState, useEffect } from 'react';
// import { toast } from "@/hooks/use-toast";

export type ApiResponse<T> = {
  données: T | null;
  chargement: boolean;
  erreur: string | null;
};

// Hook pour récupérer des données, avec fallback généré localement en cas d'échec API
export function useApiData<T>(
  url: string,
  options?: RequestInit,
  générerDonnéesFallback?: () => T
): ApiResponse<T> {
  const [données, setDonnées] = useState<T | null>(null);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    let estAnnulé = false;

    const récupérerDonnées = async () => {
      try {
        // --- Simulation d'appel API désactivée ---
        // const réponse = await fetch(url, options);
        // const connexionRéussie = Math.random() > 0.5;

        if (!estAnnulé) {
          // --- Remplacer ici l'appel API par les données locales générées ---
          if (générerDonnéesFallback) {
            const donnéesGénérées = générerDonnéesFallback();
            setDonnées(donnéesGénérées);
            setErreur(null);

            // Optionnel : message toast (commenté pour un mode full local)
            // toast({
            //   title: "Mode hors ligne",
            //   description: "Affichage des données générées localement",
            //   variant: "destructive"
            // });
          } else {
            throw new Error("Aucune fonction de fallback fournie pour générer les données.");
          }
        }
      } catch (err) {
        if (!estAnnulé) {
          setErreur((err as Error).message);

          // En cas d'erreur, fallback encore une fois
          if (générerDonnéesFallback) {
            const donnéesGénérées = générerDonnéesFallback();
            setDonnées(donnéesGénérées);
            // toast({
            //   title: "Mode hors ligne",
            //   description: "Affichage des données générées localement",
            //   variant: "destructive"
            // });
          }
        }
      } finally {
        if (!estAnnulé) {
          setChargement(false);
        }
      }
    };

    récupérerDonnées();

    return () => {
      estAnnulé = true;
    };
  }, [url, options, générerDonnéesFallback]);

  return { données, chargement, erreur };
}
