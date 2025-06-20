
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";
import { Car, Calendar, User, AlertTriangle, Check, MapPin, Info } from 'lucide-react';

interface VehicleCardProps {
  vehicle: {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    owner: string;
    registrationDate: string;
    color: string;
    category: string;
    fuelType: string;
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
}

const statusColor = {
  valid: "bg-green-100 text-green-800 border-green-200",
  expired: "bg-red-100 text-red-800 border-red-200",
  soon: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const statusLabel = {
  valid: "Valide",
  expired: "Expiré",
  soon: "Bientôt exp."
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden h-full bg-white transition-all duration-200 hover:shadow-md border-gray-200">
      <div className="flex flex-col h-full">
        {/* En-tête de la carte avec plaque et modèle */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gabon-blue">{vehicle.plate}</h3>
              <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model}</p>
            </div>
            <div>
              {vehicle.infractions > 0 ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> {vehicle.infractions}
                </Badge>
              ) : (
                <Badge variant="outline" className={statusColor.valid}>
                  <Check className="h-3.5 w-3.5 mr-1" /> 0
                </Badge>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex flex-col flex-grow">
          {/* Informations sur le propriétaire */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gabon-blue" />
              <span className="text-sm font-medium text-gray-700">Propriétaire</span>
            </div>
            <p className="ml-6 font-medium">{vehicle.owner}</p>
          </div>

          {/* Détails techniques */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Année</span>
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1" />
                <span className="font-medium">{vehicle.year}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Catégorie</span>
              <span className="font-medium">{vehicle.category}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Couleur</span>
              <div className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-1" 
                  style={{ backgroundColor: vehicle.color.toLowerCase() }} 
                />
                <span className="font-medium">{vehicle.color}</span>
              </div>
            </div>
          </div>

          {/* Statuts */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-2 rounded-md border">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Visite technique</span>
                <Badge variant="outline" className={statusColor[vehicle.technicalInspection.status]}>
                  {statusLabel[vehicle.technicalInspection.status]}
                </Badge>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md border">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Assurance</span>
                <Badge variant="outline" className={statusColor[vehicle.insurance.status]}>
                  {statusLabel[vehicle.insurance.status]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Date d'immatriculation */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Info className="h-3.5 w-3.5" />
            <span>Immatriculé le {vehicle.registrationDate}</span>
          </div>

          {/* Bouton de détails - en bas pour remplir l'espace */}
          <div className="mt-auto">
            <Button 
              className="w-full bg-gabon-blue hover:bg-gabon-blue/90"
              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            >
              <Car className="mr-2 h-4 w-4" />
              Détails complets
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default VehicleCard;
