import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Users,
    User,
    Shield,
    FileWarning,
    MapPin,
    Phone,
    Mail,
    DollarSign,
    Smartphone,
    Clock,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AgentEquipmentDetails from '@/components/agents/AgentEquipmentDetails';
import AgentControlHistory from '../components/agents/AgentControlHistory';
import AgentTransactionHistory from "../components/agents/AgentTransactionHistory";
import { toast } from "@/hooks/use-toast";

// Type pour les données agent
type Agent = {
    id: string;
    nom: string;
    prénom: string;
    email: string;
    téléphone: string;
    statut: 'actif' | 'inactif';
    nombreControles: number;
    montantRécolté: number;
    dateEmbauche?: string;
    localisation?: { lat: number; lng: number; nom: string };
    matériel: {
        zebra: boolean;
        camera: boolean;
        radar: boolean;
        dateAcquisitionZebra?: string;
        dateAcquisitionCamera?: string;
        dateAcquisitionRadar?: string;
        fonctionnalites?: string[];
    };
};

// Générer des données d'agent spécifique
import { gaboneseFirstNames, gaboneseSurnames, localities } from '@/data/mockdata';
function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}
const générerDonnéesAgent = (id: string): Agent => {
    const idx = parseInt(id.replace('A', '')) || 1;
    const nom = gaboneseSurnames[(idx - 1) % gaboneseSurnames.length];
    const prénom = gaboneseFirstNames[(idx - 1) % gaboneseFirstNames.length];
    const localite = localities[(idx - 1) % localities.length];
    return {
        id: id,
        nom,
        prénom,
        email: `${prénom.toLowerCase()}.${nom.toLowerCase()}@transport.gouv.ga`,
        téléphone: `+241 77${(100000 + idx).toString().slice(0, 6)}`,
        statut: idx % 7 === 0 ? 'inactif' : 'actif',
        nombreControles: Math.floor(5000 / 142) + (idx <= 5000 % 142 ? 1 : 0),
        montantRécolté: Math.floor(34000000 / 142),
        dateEmbauche: '2023-01-15',
        localisation: { lat: 0, lng: 0, nom: localite.name },
        matériel: {
            zebra: idx % 2 === 0,
            camera: idx % 3 === 0,
            radar: idx % 5 === 0,
            dateAcquisitionZebra: '2024-01-10',
            dateAcquisitionCamera: '2024-02-15',
            dateAcquisitionRadar: '2024-03-05',
            fonctionnalites: ["Scanner", "Imprimante", "Connectivité 4G", "GPS"]
        }
    };
};

// Formatage des nombres avec séparateur de milliers
const formaterNombre = (nombre: number) => {
    return nombre.toLocaleString('fr-FR');
};

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
};

const AgentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const { données: agent, chargement } = useApiData<Agent>(
        `https://votre-api.com/agents/${id}`,
        undefined,
        () => générerDonnéesAgent(id || 'A001')
    );

    const handleStatusChange = () => {
        if (agent) {
            const newStatus = agent.statut === 'actif' ? 'inactif' : 'actif';
            toast({
                title: "Statut modifié",
                description: `Le statut de l'agent a été changé en ${newStatus}`,
            });
        }
    };

    const handleResetEquipment = () => {
        toast({
            title: "Équipement réinitialisé",
            description: "L'équipement de l'agent a été réinitialisé avec succès",
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
                        onClick={() => navigate('/monitoring/agents')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Détails de l'Agent</h1>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(`/users/edit/${id}`)}>
                        Modifier
                    </Button>
                    <Button
                        variant={agent?.statut === 'actif' ? "destructive" : "default"}
                        onClick={handleStatusChange}
                    >
                        {agent?.statut === 'actif' ? 'Désactiver' : 'Activer'}
                    </Button>
                </div>
            </div>

            {chargement ? (
                <div className="flex items-center justify-center h-64">
                    <p>Chargement des détails de l'agent...</p>
                </div>
            ) : agent ? (
                <div className="grid gap-6">
                    {/* Informations générales */}
                    <Card>
                        <CardHeader className="bg-slate-50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Informations de l'Agent
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg">
                                    <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                        <User className="h-16 w-16 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-bold">{agent.prénom} {agent.nom}</h2>
                                    <p className="text-slate-500 mb-2">ID: {agent.id}</p>
                                    <span className={`px-3 py-1 rounded-full text-sm ${agent.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {agent.statut === 'actif' ? 'Actif' : 'Inactif'}
                                    </span>
                                </div>

                                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <div>
                                        <p className="text-sm text-slate-500">Email</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Mail className="h-4 w-4 text-slate-400" />
                                            <p>{agent.email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Téléphone</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            <p>{agent.téléphone}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Date d'embauche</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="h-4 w-4 text-slate-400" />
                                            <p>{formatDate(agent.dateEmbauche)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Localisation actuelle</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <p>{agent.localisation?.nom || 'Non localisé'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Contrôles effectués</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Shield className="h-4 w-4 text-slate-400" />
                                            <p className="font-semibold">{formaterNombre(agent.nombreControles)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Montant récolté</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <DollarSign className="h-4 w-4 text-slate-400" />
                                            <p className="font-semibold">{formaterNombre(agent.montantRécolté)} FCFA</p>
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
                                    <TabsTrigger value="equipment">Équipement</TabsTrigger>
                                    <TabsTrigger value="controls">Contrôles</TabsTrigger>
                                    {/* <TabsTrigger value="transactions">Transactions</TabsTrigger> */}
                                </TabsList>
                                <TabsContent value="equipment" className="p-6">
                                    <AgentEquipmentDetails
                                        equipment={agent.matériel}
                                        onReset={handleResetEquipment}
                                    />
                                </TabsContent>
                                <TabsContent value="controls" className="p-6">
                                    <AgentControlHistory agentId={agent.id} />
                                </TabsContent>
                                <TabsContent value="transactions" className="p-6">
                                    <AgentTransactionHistory agentId={agent.id} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-red-500">Agent non trouvé</p>
                    <Button className="mt-4" onClick={() => navigate('/monitoring/agents')}>
                        Retour à la liste
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AgentDetails;
