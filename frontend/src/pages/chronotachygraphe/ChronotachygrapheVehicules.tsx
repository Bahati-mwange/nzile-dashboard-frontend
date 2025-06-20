import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Car, MapPin, Clock, Activity, Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Vehicule {
    id: string;
    immatriculation: string;
    modele: string;
    marque: string;
    affectation: string;
    conducteurActuel?: string;
    statusTachygraphe: 'actif' | 'inactif' | 'maintenance';
    kilometrage: number;
    dernierSession: string;
    tempsUtilisationJour: number;
}

const ChronotachygrapheVehicules: React.FC = () => {
    const navigate = useNavigate();

    const vehicules: Vehicule[] = [
        {
            id: 'V001',
            immatriculation: 'GA-001-AB',
            modele: 'Hilux',
            marque: 'Toyota',
            affectation: 'Police Routière Libreville',
            conducteurActuel: 'Jean MBONGO',
            statusTachygraphe: 'actif',
            kilometrage: 145230,
            dernierSession: '2025-01-18 14:30',
            tempsUtilisationJour: 6.5
        },
        {
            id: 'V002',
            immatriculation: 'GA-002-CD',
            modele: 'Patrol',
            marque: 'Nissan',
            affectation: 'Police Routière Port-Gentil',
            conducteurActuel: 'Marie NDONG',
            statusTachygraphe: 'actif',
            kilometrage: 98765,
            dernierSession: '2025-01-18 15:45',
            tempsUtilisationJour: 7.2
        },
        {
            id: 'V003',
            immatriculation: 'GA-003-EF',
            modele: 'Ranger',
            marque: 'Ford',
            affectation: 'Police Routière Franceville',
            statusTachygraphe: 'maintenance',
            kilometrage: 203450,
            dernierSession: '2025-01-16 16:20',
            tempsUtilisationJour: 0
        }
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'actif':
                return <Badge className="bg-green-100 text-green-800">🟢 Actif</Badge>;
            case 'inactif':
                return <Badge className="bg-gray-100 text-gray-800">⚫ Inactif</Badge>;
            case 'maintenance':
                return <Badge className="bg-orange-100 text-orange-800">🔧 Maintenance</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const handleVoirDetails = (vehiculeId: string) => {
        navigate(`/chronotachygraphe/vehicule/${vehiculeId}`);
    };

    const handleVoirTrajets = (vehiculeId: string) => {
        console.log('Afficher trajets pour véhicule:', vehiculeId);
    };

    const handleDonneesRrutes = (vehiculeId: string) => {
        console.log('Voir données brutes pour véhicule:', vehiculeId);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Car className="h-6 w-6 text-blue-600" />
                        Suivi des Véhicules
                    </h1>
                    <p className="text-muted-foreground">
                        Monitoring des chronotachygraphes et utilisation des véhicules
                    </p>
                </div>
            </div>

            {/* Statistiques globales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Véhicules actifs</CardTitle>
                        <Car className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {vehicules.filter(v => v.statusTachygraphe === 'actif').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">En maintenance</CardTitle>
                        <Activity className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {vehicules.filter(v => v.statusTachygraphe === 'maintenance').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Utilisation moyenne</CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {Math.round(vehicules.reduce((acc, v) => acc + v.tempsUtilisationJour, 0) / vehicules.length * 10) / 10}h
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Kilométrage total</CardTitle>
                        <MapPin className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Math.round(vehicules.reduce((acc, v) => acc + v.kilometrage, 0) / 1000)}k km
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Liste des véhicules */}
            <Card>
                <CardHeader>
                    <CardTitle>Parc automobile avec chronotachygraphe</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Véhicule</TableHead>
                                <TableHead>Immatriculation</TableHead>
                                <TableHead>Affectation</TableHead>
                                <TableHead>Conducteur actuel</TableHead>
                                <TableHead>Statut tachygraphe</TableHead>
                                <TableHead>Kilométrage</TableHead>
                                <TableHead>Utilisation (jour)</TableHead>
                                <TableHead>Dernière session</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicules.map((vehicule) => (
                                <TableRow key={vehicule.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {vehicule.marque} {vehicule.modele}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono">{vehicule.immatriculation}</TableCell>
                                    <TableCell>{vehicule.affectation}</TableCell>
                                    <TableCell>
                                        {vehicule.conducteurActuel ? (
                                            <Badge variant="outline">{vehicule.conducteurActuel}</Badge>
                                        ) : (
                                            <span className="text-muted-foreground">Non assigné</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(vehicule.statusTachygraphe)}</TableCell>
                                    <TableCell>{vehicule.kilometrage.toLocaleString()} km</TableCell>
                                    <TableCell>
                                        <span className={vehicule.tempsUtilisationJour > 8 ? 'text-red-600 font-medium' : ''}>
                                            {vehicule.tempsUtilisationJour}h
                                        </span>
                                    </TableCell>
                                    <TableCell>{vehicule.dernierSession}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleVoirDetails(vehicule.id)}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Détails
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleVoirTrajets(vehicule.id)}
                                            >
                                                <MapPin className="h-4 w-4 mr-1" />
                                                Trajets
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDonneesRrutes(vehicule.id)}
                                            >
                                                <FileText className="h-4 w-4 mr-1" />
                                                Données
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/chronotachygraphe/vehicules/${vehicule.id}`)}
                                            title="Détails"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChronotachygrapheVehicules;