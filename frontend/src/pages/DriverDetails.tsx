
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { useApiData } from '@/hooks/useApiData';
import { ArrowLeft } from 'lucide-react';

const DriverDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { données: driver, chargement, erreur } = useApiData<any>(
        `/api/drivers/${id}`,
        {},
        () => ({
            id,
            nom: "Nzinga Pierre",
            prénom: "Louis",
            dateNaissance: "1985-07-15",
            lieuNaissance: "Libreville",
            nationalité: "Gabonaise",
            adresse: "Quartier Batterie IV, Libreville",
            téléphone: "+241 74 123 456",
            email: "pierre.nzinga@example.com",
            permis: {
                numéro: "P-123456",
                catégories: ["B", "C"],
                délivréLe: "2015-03-20",
                validitéJusquà: "2025-03-20",
                lieuDélivrance: "Libreville"
            },
            véhicules: [
                {
                    id: "v001",
                    immatriculation: "GA-1234-LBV",
                    marque: "Toyota",
                    modèle: "Land Cruiser"
                },
                {
                    id: "v005",
                    immatriculation: "GA-7890-OYE",
                    marque: "Toyota",
                    modèle: "Hilux"
                }
            ],
            infractions: [
                {
                    id: "i001",
                    date: "2025-03-15",
                    type: "Excès de vitesse",
                    lieu: "Boulevard de l'Indépendance"
                },
                {
                    id: "i002",
                    date: "2024-11-20",
                    type: "Stationnement interdit",
                    lieu: "Avenue Léon Mba"
                }
            ],
            pointsPermis: 10,
            pointsRestants: 7,
            statut: "actif"
        })
    );

    if (chargement) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-transport-blue"></div>
            </div>
        );
    }

    if (erreur || !driver) {
        return (
            <div className="container mx-auto py-6">
                <Button onClick={() => navigate(-1)} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                <Card className="mt-4">
                    <CardContent className="pt-6">
                        <div className="text-red-500">
                            {erreur ? erreur.toString() : "Impossible de trouver les détails du conducteur"}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Button onClick={() => navigate(-1)} variant="outline" className="mb-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                    <h1 className="text-2xl font-bold">{driver.nom} {driver.prénom}</h1>
                </div>
                <div>
                    <Badge
                        className={driver.statut === "actif"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"}
                    >
                        {driver.statut === "actif" ? "Actif" : "Inactif"}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations personnelles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="space-y-3">
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Nom complet:</dt>
                                <dd>{driver.nom} {driver.prénom}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Date de naissance:</dt>
                                <dd>{driver.dateNaissance}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Lieu de naissance:</dt>
                                <dd>{driver.lieuNaissance}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Nationalité:</dt>
                                <dd>{driver.nationalité}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Adresse:</dt>
                                <dd>{driver.adresse}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Téléphone:</dt>
                                <dd>{driver.téléphone}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Email:</dt>
                                <dd>{driver.email}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Permis de conduire</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="space-y-3">
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Numéro:</dt>
                                <dd>{driver.permis.numéro}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Catégories:</dt>
                                <dd>{driver.permis.catégories.join(", ")}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Délivré le:</dt>
                                <dd>{driver.permis.délivréLe}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Valide jusqu'au:</dt>
                                <dd>{driver.permis.validitéJusquà}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Lieu de délivrance:</dt>
                                <dd>{driver.permis.lieuDélivrance}</dd>
                            </div>
                            <div className="flex">
                                <dt className="w-1/3 font-medium text-muted-foreground">Points:</dt>
                                <dd>
                                    <span className="font-semibold">{driver.pointsRestants}</span>
                                    <span className="text-muted-foreground"> / {driver.pointsPermis}</span>
                                </dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Véhicules associés</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Immatriculation</TableHead>
                                    <TableHead>Marque</TableHead>
                                    <TableHead>Modèle</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {driver.véhicules.map((vehicle: any) => (
                                    <TableRow key={vehicle.id}>
                                        <TableCell className="font-medium">{vehicle.immatriculation}</TableCell>
                                        <TableCell>{vehicle.marque}</TableCell>
                                        <TableCell>{vehicle.modèle}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/vehicules/${vehicle.id}`)}
                                            >
                                                Détails
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Historique des infractions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type d'infraction</TableHead>
                                    <TableHead>Lieu</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {driver.infractions.map((infraction: any) => (
                                    <TableRow key={infraction.id}>
                                        <TableCell>{infraction.date}</TableCell>
                                        <TableCell>{infraction.type}</TableCell>
                                        <TableCell>{infraction.lieu}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/infractions/${infraction.id}`)}
                                            >
                                                Détails
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DriverDetailsPage;