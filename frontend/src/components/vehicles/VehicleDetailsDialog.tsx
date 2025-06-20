import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, FileText, Calendar, Info, User, Shield, Printer } from 'lucide-react';
import RoadControlDocument from './RoadControlDocument';

interface VehicleDetailsProps {
  vehicle: {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    owner: string;
    vin?: string;
    registrationDate?: string;
    color?: string;
    category?: string;
    fuelType?: string;
    technicalInspection: {
      date: string;
      status: 'valid' | 'expired' | 'soon';
    };
    insurance: {
      company: string;
      policyNumber: string;
      expiryDate: string;
      status: 'valid' | 'expired' | 'soon';
    };
    infractions: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VehicleDetailsDialog: React.FC<VehicleDetailsProps> = ({ vehicle, open, onOpenChange }) => {
  const [showRoadControlDoc, setShowRoadControlDoc] = useState(false);
  
  const getStatusBadge = (status: 'valid' | 'expired' | 'soon') => {
    switch (status) {
      case 'valid':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Valide
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Expiré
          </Badge>
        );
      case 'soon':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Bientôt expiré
          </Badge>
        );
    }
  };

  // Mock road control data
  const mockRoadControlData = {
    reference: "CR-000001",
    date: "15/05/2023",
    location: "Boulevard de l'Indépendance, Libreville",
    controlType: "routine",
    agent: "agent_dttt",
    agentRole: "Agent",
    vehicle: {
      plate: vehicle.plate,
      brand: vehicle.brand,
      model: vehicle.model,
      category: vehicle.category || "N/A",
      vin: vehicle.vin || "N/A",
    },
    driver: {
      name: "Nzinga Louis",
      address: "123 Rue des Palmiers, Libreville",
      phone: "+241 74 12 34 56",
    },
    infractions: [
      {
        type: "Excès de vitesse",
        description: "Dépassement de la vitesse autorisée de plus de 20 km/h",
        amount: 25000,
      },
      {
        type: "Usage du téléphone au volant",
        description: "Utilisation d'un téléphone mobile en conduisant",
        amount: 15000,
      },
    ],
    payment: {
      reference: "PAY-2023-0001",
      paymentKey: "ABC123",
      paymentUrl: "www.nzila-gabon.ga/paiement-contestation",
    },
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <div className="p-2 rounded-full bg-blue-100 text-blue-800 mr-2">
                <FileText className="h-5 w-5" />
              </div>
              Détails du véhicule
            </DialogTitle>
            <DialogDescription className="flex justify-between items-center">
              <span>Informations complètes sur le véhicule {vehicle.plate}</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    onOpenChange(false);
                    setTimeout(() => setShowRoadControlDoc(true), 100);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Contrôle routier
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center flex-col">
                  <div className="w-16 h-16 bg-transport-blue/10 rounded-full flex items-center justify-center mb-2">
                    <span className="text-transport-blue text-xl font-bold">{vehicle.plate}</span>
                  </div>
                  <p className="text-lg font-bold">{vehicle.brand} {vehicle.model}</p>
                  <p className="text-sm text-muted-foreground">{vehicle.year}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-transport-blue" />
                    <span className="text-sm font-medium">Propriétaire</span>
                  </div>
                  <p className="text-base pl-6">{vehicle.owner}</p>
                  
                  {vehicle.registrationDate && (
                    <>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-transport-blue" />
                        <span className="text-sm font-medium">Date d'immatriculation</span>
                      </div>
                      <p className="text-base pl-6">{vehicle.registrationDate}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {vehicle.color && (
                    <>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-transport-blue" />
                        <span className="text-sm font-medium">Couleur</span>
                      </div>
                      <p className="text-base pl-6">{vehicle.color}</p>
                    </>
                  )}
                  
                  {vehicle.category && (
                    <>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-transport-blue" />
                        <span className="text-sm font-medium">Catégorie</span>
                      </div>
                      <p className="text-base pl-6">{vehicle.category}</p>
                    </>
                  )}
                  
                  {vehicle.fuelType && (
                    <>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-transport-blue" />
                        <span className="text-sm font-medium">Carburant</span>
                      </div>
                      <p className="text-base pl-6">{vehicle.fuelType}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-4" />

          <h3 className="text-lg font-semibold mb-2">Documents et conformité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-md font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-transport-blue" />
                  Visite technique
                </h4>
                <div className="mt-2">
                  {getStatusBadge(vehicle.technicalInspection.status)}
                  <p className="text-sm mt-2">
                    Date d'expiration: {vehicle.technicalInspection.date}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="text-md font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-transport-blue" />
                  Assurance
                </h4>
                <div className="mt-2">
                  {getStatusBadge(vehicle.insurance.status)}
                  <p className="text-sm mt-2">
                    Compagnie: {vehicle.insurance.company}
                  </p>
                  <p className="text-sm">
                    Police N°: {vehicle.insurance.policyNumber}
                  </p>
                  <p className="text-sm">
                    Date d'expiration: {vehicle.insurance.expiryDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {vehicle.infractions > 0 && (
            <>
              <Card className="bg-red-50 border-red-200">
                <CardContent className="pt-6">
                  <h4 className="text-md font-medium text-red-800 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Infractions enregistrées
                  </h4>
                  <p className="text-sm text-red-700 mt-2">
                    Ce véhicule a {vehicle.infractions} {vehicle.infractions > 1 ? 'infractions' : 'infraction'} enregistrées dans le système.
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <RoadControlDocument 
        controlData={mockRoadControlData} 
        open={showRoadControlDoc} 
        onOpenChange={setShowRoadControlDoc} 
      />
    </>
  );
};

export default VehicleDetailsDialog;
