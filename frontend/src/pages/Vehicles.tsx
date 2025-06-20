
import React, { useState } from 'react';
import VehicleSearchForm from '@/components/vehicles/VehicleSearchForm';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

// Simuler l'ajout d'un véhicule "Nouveau"
const [initialVehicles] = [ [
  {
    id: '1',
    plate: 'GA-123-LBV',
    brand: 'Toyota',
    model: 'Land Cruiser',
    year: 2021,
    owner: 'Ndong Mba Jean',
    registrationDate: '15/06/2021',
    color: 'Blanc',
    category: 'SUV',
    fuelType: 'Diesel',
    technicalInspection: { date: '15/10/2025', status: 'valid' as const },
    insurance: { company: 'NSIA Assurance', policyNumber: 'NS-12345678', expiryDate: '31/12/2025', status: 'valid' as const },
    infractions: 2,
  },
  {
    id: '2',
    plate: 'GA-456-POG',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2019,
    owner: 'Ondo Sophie',
    registrationDate: '23/03/2019',
    color: 'Gris',
    category: 'SUV',
    fuelType: 'Essence',
    technicalInspection: { date: '03/06/2025', status: 'valid' as const },
    insurance: { company: 'AXA Gabon', policyNumber: 'AX-87654321', expiryDate: '15/04/2025', status: 'soon' as const },
    infractions: 0,
  },
  {
    id: '3',
    plate: 'GA-789-FCE',
    brand: 'Peugeot',
    model: '3008',
    year: 2018,
    owner: 'Moussavou Pierre',
    registrationDate: '12/09/2018',
    color: 'Noir',
    category: 'SUV',
    fuelType: 'Diesel',
    technicalInspection: { date: '22/02/2023', status: 'expired' as const },
    insurance: { company: 'OGAR Assurances', policyNumber: 'OG-24681357', expiryDate: '10/01/2023', status: 'expired' as const },
    infractions: 5,
  },
  {
    id: '4',
    plate: 'GA-012-OYM',
    brand: 'Mitsubishi',
    model: 'Pajero',
    year: 2020,
    owner: 'Obiang Marie',
    registrationDate: '05/11/2020',
    color: 'Bleu',
    category: '4x4',
    fuelType: 'Diesel',
    technicalInspection: { date: '18/11/2025', status: 'valid' as const },
    insurance: { company: 'UAG Assurances', policyNumber: 'UA-13572468', expiryDate: '30/09/2025', status: 'valid' as const },
    infractions: 1,
  },
] ];

const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [filtered, setFiltered] = useState(vehicles);
  const navigate = useNavigate();

  const handleSearch = ({ plate, owner }: { plate: string; owner: string }) => {
    let next = vehicles;
    if (plate.trim()) next = vehicles.filter(v => v.plate.toLowerCase().includes(plate.trim().toLowerCase()));
    if (owner.trim()) next = next.filter(v => v.owner.toLowerCase().includes(owner.trim().toLowerCase()));
    setFiltered(next);
  };

  // Responsive, fix overflow and ensure cards resize well
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gabon-blue">Véhicules</h1>
          <p className="text-muted-foreground">
            Recherchez, consultez et gérez les données des véhicules enregistrés
          </p>
        </div>
        <Button 
          className="bg-gabon-blue hover:bg-gabon-blue/90"
          onClick={() => navigate('/vehicles/new')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un véhicule
        </Button>
      </div>
      {/* Bandeau suggestion indication UI */}
      
      <VehicleSearchForm onSearch={handleSearch} />
      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
          <TabsList className="bg-gabon-blue/10">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="alerts">Avec alertes</TabsTrigger>
            <TabsTrigger value="infractions">Avec infractions</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Affichage de {filtered.length} véhicule{filtered.length > 1 && 's'}
          </div>
        </div>
        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="alerts" className="mt-0">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {filtered
              .filter(v => v.technicalInspection.status !== 'valid' || v.insurance.status !== 'valid')
              .map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="infractions" className="mt-0">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {filtered
              .filter(v => v.infractions > 0)
              .map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vehicles;
