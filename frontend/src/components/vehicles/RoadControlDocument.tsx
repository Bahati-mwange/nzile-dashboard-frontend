
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface RoadControlDocumentProps {
  controlData: {
    reference: string;
    date: string;
    location: string;
    controlType: string;
    agent: string;
    agentRole: string;
    vehicle: {
      plate: string;
      brand: string;
      model: string;
      category: string;
      vin: string;
    };
    driver: {
      name: string;
      address: string;
      phone: string;
    };
    infractions: {
      type: string;
      description: string;
      amount: number;
    }[];
    payment: {
      reference: string;
      paymentKey: string;
      paymentUrl: string;
    };
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoadControlDocument: React.FC<RoadControlDocumentProps> = ({
  controlData,
  open,
  onOpenChange,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const totalAmount = controlData.infractions.reduce((sum, infraction) => sum + infraction.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="print:shadow-none print:p-6">
          <DialogHeader className="p-6 pb-2 print:p-0 flex justify-between items-start">
            <DialogTitle className="text-2xl">Impression du contrôle #{controlData.reference}</DialogTitle>
            <Button 
              onClick={handlePrint} 
              className="print:hidden" 
              variant="outline"
              size="sm"
            >
              <Printer className="mr-2 h-4 w-4" /> Imprimer
            </Button>
          </DialogHeader>

          <div className="p-6 pt-2 print:p-0">
            {/* Header with Gabon flag colors */}
            <div className="border rounded-lg overflow-hidden mb-6">
              <div className="flex flex-col items-center p-4 bg-white border-b">
                <div className="flex w-full justify-center mb-2">
                  <div className="h-2 w-full bg-green-600"></div>
                  <div className="h-2 w-full bg-yellow-400"></div>
                  <div className="h-2 w-full bg-blue-600"></div>
                </div>
                <div className="text-center">
                  <h2 className="font-bold text-lg uppercase">République Gabonaise</h2>
                  <p className="text-sm text-gray-600">Police Nationale - Direction de la Police Routière</p>
                </div>
                <div className="flex justify-between w-full mt-4">
                  <div></div>
                  <div className="text-right">
                    <h3 className="font-bold">CONTRÔLE ROUTIER</h3>
                    <p className="text-sm">Réf: {controlData.reference}</p>
                    <p className="text-sm">{controlData.date}</p>
                  </div>
                </div>
              </div>

              {/* General Information */}
              <div className="p-4 bg-gray-50">
                <h3 className="font-bold mb-2">Informations Générales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Lieu du contrôle:</p>
                    <p>{controlData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type de contrôle:</p>
                    <p>{controlData.controlType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Agent responsable:</p>
                    <p>{controlData.agent}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rôle:</p>
                    <p>{controlData.agentRole}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="p-4 bg-white">
                <h3 className="font-bold mb-2">Véhicule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Immatriculation:</p>
                    <p>{controlData.vehicle.plate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Marque et modèle:</p>
                    <p>{controlData.vehicle.brand} {controlData.vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Genre:</p>
                    <p>{controlData.vehicle.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Numéro de série:</p>
                    <p>{controlData.vehicle.vin}</p>
                  </div>
                </div>
              </div>

              {/* Driver Information */}
              <div className="p-4 bg-gray-50">
                <h3 className="font-bold mb-2">Conducteur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nom et prénom:</p>
                    <p>{controlData.driver.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Adresse:</p>
                    <p>{controlData.driver.address}</p>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-sm font-medium text-gray-500">Contact:</p>
                    <p>{controlData.driver.phone}</p>
                  </div>
                </div>
              </div>

              {/* Fines */}
              <div className="p-4 bg-white">
                <h3 className="font-bold mb-2">Amendes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-sm font-medium">Infraction</th>
                        <th className="py-2 px-4 text-left text-sm font-medium">Description</th>
                        <th className="py-2 px-4 text-right text-sm font-medium">Montant (FCFA)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {controlData.infractions.map((infraction, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4">{infraction.type}</td>
                          <td className="py-2 px-4">{infraction.description}</td>
                          <td className="py-2 px-4 text-right">{infraction.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="border-t font-bold">
                        <td className="py-2 px-4" colSpan={2}>Total</td>
                        <td className="py-2 px-4 text-right">{totalAmount.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Information */}
              <div className="p-4 bg-gray-50">
                <h3 className="font-bold mb-2">Informations de paiement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Numéro de paiement:</p>
                    <p>{controlData.payment.reference}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Clé de paiement:</p>
                    <p>{controlData.payment.paymentKey}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Pour procéder au paiement ou faire une contestation, veuillez vous rendre sur: {controlData.payment.paymentUrl}
                </p>
              </div>

              {/* Signatures */}
              <div className="p-4 bg-white grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-8">Signature de l'agent</p>
                  <div className="border-t border-dashed w-40"></div>
                </div>
                <div>
                  <p className="font-medium mb-8">Signature du conducteur</p>
                  <div className="border-t border-dashed w-40"></div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 text-center text-xs text-gray-500">
                Direction Générale de la Police Nationale du Gabon - Tous droits réservés
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoadControlDocument;
