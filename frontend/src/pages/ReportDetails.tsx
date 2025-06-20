
import React from 'react';
import ReportDetails from '@/components/reports/ReportDetails';
import Preloader from '@/components/ui/preloader';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

const ReportDetailsPage: React.FC = () => {
  // Simuler un chargement initial pour montrer le preloader
  const { isLoading } = useQuery({
    queryKey: ['page-load'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 1000));
      return true;
    },
    meta: {
      onSuccess: () => {
        toast({
          title: "Bienvenue",
          description: "Les détails du rapport sont maintenant disponibles",
          variant: "success"
        });
      }
    }
  });

  if (isLoading) {
    return <Preloader />;
  }

  return <ReportDetails />;
};

export default ReportDetailsPage;
