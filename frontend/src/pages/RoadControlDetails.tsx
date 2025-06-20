
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { useAuthToken } from '@/hooks/useAuthToken';
import { useApiData } from '@/hooks/useApiData';

const RoadControlDetails: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { TokenExpirationDialog } = useAuthToken();
  const [showFullImage, setShowFullImage] = useState<string | null>(null);
  
  // Mock data for demonstration
  const { données: controlData, chargement, erreur } = useApiData<any>(
    `/api/controles/${params.id}`,
    {},
    () => ({
      id: params.id,
      reference: "CR-000001",
      date: "15/05/2023",
      location: "Boulevard de l'Indépendance, Libreville",
      controlType: "routine",
      agent: "agent_dttt",
      agentRole: "Agent",
      vehicle: {
        id: "v123",
        plate: "LD-559-AA",
        brand: "Toyota",
        model: "Hilux",
        category: "Pickup",
        vin: "TOY1234567890",
        owner: {
          name: "Nzinga Louis",
          address: "123 Rue des Palmiers, Libreville",
          phone: "+241 74 12 34 56"
        }
      },
      infractions: [
        {
          type: "Excès de vitesse",
          description: "Dépassement de la vitesse autorisée de plus de 20 km/h",
          amount: 25000,
          status: "unpaid"
        },
        {
          type: "Usage du téléphone au volant",
          description: "Utilisation d'un téléphone mobile en conduisant",
          amount: 15000,
          status: "unpaid"
        }
      ],
      payment: {
        reference: "PAY-2023-0001",
        paymentKey: "ABC123",
        paymentUrl: "www.nzila-gabon.ga/paiement-contestation",
        status: "pending"
      },
      images: [
        "/documents/control-image1.jpg",
        "/documents/control-image2.jpg"
      ]
    })
  );

  if (chargement) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-transport-blue"></div>
      </div>
    );
  }

  if (erreur || !controlData) {
    return (
      <div className="max-w-3xl mx-auto">
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200">
          {erreur || "Les détails du contrôle routier sont introuvables."}
        </div>
      </div>
    );
  }

  const totalAmount = controlData.infractions.reduce(
    (sum: number, inf: any) => sum + inf.amount, 0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 print:pb-0">
      <TokenExpirationDialog />
      
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 print:hidden">
        <div>
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">
            Contrôle Routier #{controlData.reference}
          </h1>
          <p className="text-gray-600">
            {controlData.date} • {controlData.location}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Exporter PDF
          </Button>
        </div>
      </div>

      {/* Control Document */}
      <div className="border rounded-lg overflow-hidden mb-6 bg-white print:shadow-none">
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

        <div className="p-4 md:p-6">
          {/* General Information */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="font-bold text-lg mb-4">Informations Générales</h3>
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
          <div className="mb-6 pb-6 border-b">
            <h3 className="font-bold text-lg mb-4">Véhicule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Immatriculation:</p>
                <p className="flex items-center">
                  {controlData.vehicle.plate}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="ml-2 p-0 h-auto print:hidden"
                    onClick={() => navigate(`/vehicles/${controlData.vehicle.id}`)}
                  >
                    Voir détails
                  </Button>
                </p>
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
          <div className="mb-6 pb-6 border-b">
            <h3 className="font-bold text-lg mb-4">Conducteur</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nom et prénom:</p>
                <p>{controlData.vehicle.owner.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Adresse:</p>
                <p>{controlData.vehicle.owner.address}</p>
              </div>
              <div className="md:col-span-1">
                <p className="text-sm font-medium text-gray-500">Contact:</p>
                <p>{controlData.vehicle.owner.phone}</p>
              </div>
            </div>
          </div>

          {/* Infractions / Fines */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="font-bold text-lg mb-4">Amendes</h3>
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
                  {controlData.infractions.map((infraction: any, index: number) => (
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
          <div className="mb-6 pb-6 border-b">
            <h3 className="font-bold text-lg mb-4">Informations de paiement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Numéro de paiement:</p>
                <p>{controlData.payment.reference}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Clé de paiement:</p>
                <p>{controlData.payment.paymentKey}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Statut:</p>
                <p className="capitalize">
                  {controlData.payment.status === "pending" ? "En attente" : 
                   controlData.payment.status === "paid" ? "Payé" : "Non payé"}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Pour procéder au paiement ou faire une contestation, veuillez vous rendre sur: {controlData.payment.paymentUrl}
            </p>
          </div>

          {/* Evidence / Images */}
          {controlData.images && controlData.images.length > 0 && (
            <div className="mb-6 pb-6 border-b print:hidden">
              <h3 className="font-bold text-lg mb-4">Photos du contrôle</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {controlData.images.map((img: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="border rounded overflow-hidden cursor-pointer"
                    onClick={() => setShowFullImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`Photo du contrôle ${idx+1}`} 
                      className="w-full h-32 object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-4 print:mt-12">
            <div>
              <p className="font-medium mb-8">Signature de l'agent</p>
              <div className="border-t border-dashed w-40"></div>
            </div>
            <div>
              <p className="font-medium mb-8">Signature du conducteur</p>
              <div className="border-t border-dashed w-40"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center text-xs text-gray-500">
          Direction Générale de la Police Nationale du Gabon - Tous droits réservés
        </div>
      </div>

      {/* Image modal */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh]">
            <img 
              src={showFullImage} 
              alt="Vue agrandie" 
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadControlDetails;
