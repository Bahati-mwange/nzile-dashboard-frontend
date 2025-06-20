
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VehicleAdd: React.FC = () => {
  const navigate = useNavigate();

  // This would typically be connected to a form handling library like react-hook-form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would usually save the data
    // For now, just navigate back to the vehicles list
    navigate('/vehicles');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => navigate('/vehicles')} className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un nouveau véhicule</CardTitle>
          <CardDescription>
            Renseignez les informations du véhicule à enregistrer dans la base de données
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations principales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plate">Plaque d'immatriculation</Label>
                  <Input id="plate" placeholder="Ex: GA-123-LBV" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registrationDate">Date d'immatriculation</Label>
                  <Input id="registrationDate" type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marque</Label>
                  <Input id="brand" placeholder="Ex: Toyota" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Modèle</Label>
                  <Input id="model" placeholder="Ex: Corolla" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Année</Label>
                  <Input id="year" type="number" placeholder="Ex: 2020" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Couleur</Label>
                  <Input id="color" placeholder="Ex: Blanc" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Berline">Berline</SelectItem>
                      <SelectItem value="4x4">4x4</SelectItem>
                      <SelectItem value="Utilitaire">Utilitaire</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Type de carburant</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Essence">Essence</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Électrique">Électrique</SelectItem>
                      <SelectItem value="Hybride">Hybride</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Propriétaire</h3>
              <div className="space-y-2">
                <Label htmlFor="owner">Nom complet du propriétaire</Label>
                <Input id="owner" placeholder="Ex: Ndong Mba Jean" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="technicalInspectionDate">Date d'expiration visite technique</Label>
                  <Input id="technicalInspectionDate" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiryDate">Date d'expiration assurance</Label>
                  <Input id="insuranceExpiryDate" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insuranceCompany">Compagnie d'assurance</Label>
                  <Input id="insuranceCompany" placeholder="Ex: NSIA Assurance" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Numéro de police</Label>
                  <Input id="policyNumber" placeholder="Ex: NS-12345678" />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/vehicles')}>Annuler</Button>
            <Button type="submit" className="bg-gabon-blue hover:bg-gabon-blue/90">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default VehicleAdd;
