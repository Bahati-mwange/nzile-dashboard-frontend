import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, Camera, Radar, User, Calendar, Clock, FileText, Wrench, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

type EquipementStatus = 'actif' | 'maintenance' | 'inactif';

interface MaintenanceLog {
    id: string;
    date: string;
    type: 'entretien' | 'réparation' | 'mise_a_jour';
    description: string;
    technicien: string;
}

interface Equipement {
    id: string;
    type: 'zebra' | 'camera' | 'radar';
    modele: string;
    numero_serie: string;
    date_acquisition: string;
    date_mise_en_service: string;
    statut: EquipementStatus;
    specifications: Record<string, string>;
    agent_assigne?: {
        id: string;
        nom: string;
        prénom: string;
    };
    lieu?: string;
    localisation?: string;
    dernier_entretien?: string;
    historique_maintenance: MaintenanceLog[];
}

const genererDonneesEquipement = (id: string): Equipement => {
    const isZebra = id === "EQ001" || id === "EQ002" || id === "EQ005";
    const isCamera = id === "EQ003" || id === "EQ006";
    const isRadar = id === "EQ004" || id === "EQ007";

    const type = isZebra ? 'zebra' : isCamera ? 'camera' : 'radar';

    let specifications: Record<string, string> = {};

    if (isZebra) {
        specifications = {
            "OS": "Android 10",
            "Processeur": "Octa-core 2.2 GHz",
            "Mémoire": "4 GB RAM, 32 GB stockage",
            "Écran": "4.7 pouces HD",
            "Batterie": "4500 mAh",
            "Scanner": "1D/2D omnidirectionnel",
            "Connectivité": "4G LTE, WiFi, Bluetooth 5.0, GPS",
            "Imprimante": "Thermique intégrée"
        };
    } else if (isCamera) {
        specifications = {
            "Résolution": "1080p Full HD",
            "Stockage": "128 GB",
            "Batterie": "12 heures d'enregistrement continu",
            "Vision nocturne": "Oui",
            "Étanchéité": "IP67",
            "Connectivité": "WiFi, Bluetooth",
            "lieu": "Libreville - Boulevard de l'Indépendance",
        };
    } else {
        specifications = {
            "Portée": "Jusqu'à 1km",
            "Précision": "±1 km/h",
            "Alimentation": "Batterie 24h ou secteur",
            "Plage de détection": "10-300 km/h",
            "Étanchéité": "IP65",
            "Connectivité": "4G LTE, WiFi",
            "lieu": "Libreville - Bas de gue-gue",
        };
    }

    return {
        id,
        type,
        modele: type === 'zebra' ? "Zebra TC77" : type === 'camera' ? "BodyCam Pro X3" : "SpeedTracker RT450",
        numero_serie: type === 'zebra' ? `ZTC77-2023-00${id.slice(-1)}` : type === 'camera' ? `BCX3-2024-00${id.slice(-1)}` : `ST450-2023-01${id.slice(-1)}`,
        date_acquisition: "2023-12-10",
        date_mise_en_service: "2024-01-05",
        statut: id === "EQ002" || id === "EQ007" ? "maintenance" : id === "EQ005" ? "inactif" : "actif",
        specifications,
        agent_assigne: isZebra
            ? id === "EQ001"
                ? { id: "A001", nom: "Ngouabi", prénom: "Jean" }
                : id === "EQ002"
                    ? { id: "A002", nom: "Mouele", prénom: "Marie" }
                    : id === "EQ005"
                        ? { id: "A005", nom: "Mouanga", prénom: "Pierre" }
                        : undefined
            : undefined,
        localisation: id !== "EQ005" ? id === "EQ001" || id === "EQ003" ? "Libreville Centre" : id === "EQ002" ? "Port-Gentil" : id === "EQ004" ? "Franceville" : id === "EQ007" ? "Libreville Nord" : "Oyem" : undefined,
        dernier_entretien: "2024-04-10",
        historique_maintenance: [
            {
                id: `M001-${id}`,
                date: "2024-04-10",
                type: "entretien",
                description: "Entretien périodique et mise à jour du firmware",
                technicien: "Koumba Roger"
            },
            {
                id: `M002-${id}`,
                date: "2024-02-15",
                type: "mise_a_jour",
                description: "Installation de la dernière version du logiciel",
                technicien: "Système automatique"
            },
            {
                id: `M003-${id}`,
                date: id === "EQ002" || id === "EQ007" ? "2024-05-02" : "2024-01-05",
                type: id === "EQ002" || id === "EQ007" ? "réparation" : "mise_a_jour",
                description: id === "EQ002" || id === "EQ007" ? "Réparation suite à une chute" : "Configuration initiale",
                technicien: id === "EQ002" || id === "EQ007" ? "Nze Pascal" : "Équipe technique"
            }
        ]
    };
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
};

const getEquipementIcon = (type: string, size: number = 6) => {
    switch (type) {
        case 'zebra':
            return <Smartphone className={`h-${size} w-${size} text-blue-600`} />;
        case 'camera':
            return <Camera className={`h-${size} w-${size} text-purple-600`} />;
        case 'radar':
            return <Radar className={`h-${size} w-${size} text-green-600`} />;
        default:
            return <Smartphone className={`h-${size} w-${size} text-gray-600`} />;
    }
};

const getEquipementName = (type: string) => {
    switch (type) {
        case 'zebra': return 'Terminal Zebra';
        case 'camera': return 'Caméra';
        case 'radar': return 'Radar';
        default: return type;
    }
};

const getStatusBadge = (status: EquipementStatus) => {
    switch (status) {
        case 'actif':
            return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Actif</Badge>;
        case 'maintenance':
            return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Maintenance</Badge>;
        case 'inactif':
            return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Inactif</Badge>;
    }
};

const getMaintenanceTypeBadge = (type: string) => {
    switch (type) {
        case 'entretien':
            return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Entretien</Badge>;
        case 'réparation':
            return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Réparation</Badge>;
        case 'mise_a_jour':
            return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Mise à jour</Badge>;
        default:
            return <Badge variant="outline">{type}</Badge>;
    }
};

const EquipementDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('specifications');

    const { données: equipement, chargement } = useApiData<Equipement>(
        `https://votre-api.com/equipements/${id}`,
        undefined,
        () => genererDonneesEquipement(id || 'EQ001')
    );

    const handleChangeStatus = (newStatus: EquipementStatus) => {
        toast({
            title: "Statut modifié",
            description: `Le statut de l'équipement a été changé en ${newStatus}`,
        });
    };

    const handleRequestMaintenance = () => {
        toast({
            title: "Maintenance demandée",
            description: "Une demande de maintenance a été envoyée pour cet équipement",
        });
    };

    const handleAssignEquipment = () => {
        toast({
            title: "Équipement assigné",
            description: "L'équipement a été assigné avec succès",
        });
    };

    return (
        <div className="space-y-6 pb-10">
            {/* En-tête et actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate('/monitoring/equipements')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Détails de l'Équipement</h1>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleRequestMaintenance}
                    >
                        Demander maintenance
                    </Button>
                    {equipement?.statut === 'inactif' ? (
                        <Button
                            variant="default"
                            onClick={() => handleChangeStatus('actif')}
                        >
                            Activer
                        </Button>
                    ) : (
                        <Button
                            variant="destructive"
                            onClick={() => handleChangeStatus('inactif')}
                        >
                            Désactiver
                        </Button>
                    )}
                </div>
            </div>

            {chargement ? (
                <div className="flex items-center justify-center h-64">
                    <p>Chargement des détails de l'équipement...</p>
                </div>
            ) : equipement ? (
                <div className="grid gap-6">
                    {/* Informations générales */}
                    <Card>
                        <CardHeader className="bg-slate-50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                {getEquipementIcon(equipement.type, 5)}
                                Informations de l'Équipement
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg">
                                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                        {getEquipementIcon(equipement.type, 12)}
                                    </div>
                                    <h2 className="text-xl font-bold">{equipement.modele}</h2>
                                    <p className="text-slate-500 mb-2">{getEquipementName(equipement.type)}</p>
                                    <p className="text-sm text-slate-500 mb-2">ID: {equipement.id}</p>
                                    {getStatusBadge(equipement.statut)}
                                </div>

                                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <div>
                                        <p className="text-sm text-slate-500">Numéro de série</p>
                                        <div className="mt-1 font-mono">
                                            {equipement.numero_serie}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Agent assigné</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <User className="h-4 w-4 text-slate-400" />
                                            {equipement.agent_assigne ? (
                                                <a
                                                    href={`/users/${equipement.agent_assigne.id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {equipement.agent_assigne.prénom} {equipement.agent_assigne.nom}
                                                </a>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleAssignEquipment}
                                                >
                                                    Assigner
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Date d'acquisition</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <p>{formatDate(equipement.date_acquisition)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Date de mise en service</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="h-4 w-4 text-slate-400" />
                                            <p>{formatDate(equipement.date_mise_en_service)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Localisation actuelle</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <p>{equipement.localisation || 'Non localisé'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Dernier entretien</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Wrench className="h-4 w-4 text-slate-400" />
                                            <p>{formatDate(equipement.dernier_entretien || '')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Onglets pour informations supplémentaires */}
                    <Card>
                        <CardContent className="p-0">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="w-full border-b rounded-none grid grid-cols-2">
                                    <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                                    <TabsTrigger value="maintenance">Historique de maintenance</TabsTrigger>
                                </TabsList>
                                <TabsContent value="specifications" className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(equipement.specifications).map(([key, value]) => (
                                            <div key={key} className="p-4 border rounded-lg">
                                                <p className="text-sm text-slate-500">{key}</p>
                                                <p className="font-medium">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="maintenance" className="p-6">
                                    <div className="space-y-6">
                                        {equipement.historique_maintenance.map((log, index) => (
                                            <div key={log.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-slate-100 p-2 rounded-full">
                                                            <FileText className="h-4 w-4 text-slate-600" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium">{formatDate(log.date)}</p>
                                                                {getMaintenanceTypeBadge(log.type)}
                                                            </div>
                                                            <p className="text-sm text-slate-500 mt-1">Technicien: {log.technicien}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            toast({
                                                                title: "Rapport ouvert",
                                                                description: "Le rapport de maintenance a été ouvert",
                                                            });
                                                        }}
                                                    >
                                                        Voir rapport
                                                    </Button>
                                                </div>
                                                <p className="mt-2 pl-10 text-sm">{log.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-red-500">Équipement non trouvé</p>
                    <Button className="mt-4" onClick={() => navigate('/monitoring/equipements')}>
                        Retour à la liste
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EquipementDetails;
