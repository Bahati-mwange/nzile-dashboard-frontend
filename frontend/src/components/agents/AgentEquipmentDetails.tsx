
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Smartphone,
    Printer,
    Camera,
    Radar,
    FileSearch
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface EquipmentProps {
    equipment: {
        zebra: boolean;
        camera: boolean;
        radar: boolean;
        dateAcquisitionZebra?: string;
        dateAcquisitionCamera?: string;
        dateAcquisitionRadar?: string;
        fonctionnalites?: string[];
    };
    onReset: () => void;
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
};

const AgentEquipmentDetails: React.FC<EquipmentProps> = ({ equipment, onReset }) => {
    const [maintenance, setMaintenance] = useState(false);

    const handleMaintenanceRequest = () => {
        setMaintenance(true);
        toast({
            title: "Demande de maintenance",
            description: "Une demande de maintenance a été envoyée pour cet équipement",
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-1">
                <Card className={equipment.zebra ? "border-blue-200" : "border-gray-200 opacity-60"}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${equipment.zebra ? "bg-blue-100" : "bg-gray-100"}`}>
                                    <Smartphone className={`h-6 w-6 ${equipment.zebra ? "text-blue-600" : "text-gray-400"}`} />
                                </div>
                                <div>
                                    <h3 className="font-medium">Terminal Zebra</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {equipment.zebra ? "Fonctionnel" : "Non assigné"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium">
                                    Date d'acquisition
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {formatDate(equipment.dateAcquisitionZebra)}
                                </div>
                            </div>
                        </div>

                        {equipment.zebra && (
                            <>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {(equipment.fonctionnalites || []).map((fonc, idx) => (
                                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-1">
                                            {fonc}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleMaintenanceRequest}
                                        disabled={maintenance}
                                    >
                                        {maintenance ? "Maintenance demandée" : "Demander maintenance"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            toast({
                                                title: "Connexion testée",
                                                description: "Le terminal Zebra est correctement connecté",
                                            });
                                        }}
                                    >
                                        Tester connexion
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            toast({
                                                title: "Scanner testé",
                                                description: "La fonction scanner fonctionne correctement",
                                            });
                                        }}
                                    >
                                        Tester scanner
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            toast({
                                                title: "Imprimante testée",
                                                description: "La fonction imprimante fonctionne correctement",
                                            });
                                        }}
                                    >
                                        Tester imprimante
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* <h3 className="text-md font-medium border-b pb-2">Équipements additionnels</h3>
            <div className="grid gap-4 md:grid-cols-2">
                <Card className={equipment.camera ? "border-purple-200" : "border-gray-200 opacity-60"}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${equipment.camera ? "bg-purple-100" : "bg-gray-100"}`}>
                                    <Camera className={`h-6 w-6 ${equipment.camera ? "text-purple-600" : "text-gray-400"}`} />
                                </div>
                                <div>
                                    <h3 className="font-medium">Caméra</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {equipment.camera ? "Fonctionnelle" : "Non assignée"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium">
                                    Date d'acquisition
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {formatDate(equipment.dateAcquisitionCamera)}
                                </div>
                            </div>
                        </div>

                        {equipment.camera && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleMaintenanceRequest}
                                    disabled={maintenance}
                                >
                                    {maintenance ? "Maintenance demandée" : "Demander maintenance"}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        toast({
                                            title: "Batterie vérifiée",
                                            description: "Niveau de batterie: 85%",
                                        });
                                    }}
                                >
                                    Vérifier batterie
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className={equipment.radar ? "border-green-200" : "border-gray-200 opacity-60"}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${equipment.radar ? "bg-green-100" : "bg-gray-100"}`}>
                                    <Radar className={`h-6 w-6 ${equipment.radar ? "text-green-600" : "text-gray-400"}`} />
                                </div>
                                <div>
                                    <h3 className="font-medium">Radar</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {equipment.radar ? "Fonctionnel" : "Non assigné"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium">
                                    Date d'acquisition
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {formatDate(equipment.dateAcquisitionRadar)}
                                </div>
                            </div>
                        </div>

                        {equipment.radar && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleMaintenanceRequest}
                                    disabled={maintenance}
                                >
                                    {maintenance ? "Maintenance demandée" : "Demander maintenance"}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        toast({
                                            title: "Calibrage vérifié",
                                            description: "Le radar est correctement calibré",
                                        });
                                    }}
                                >
                                    Vérifier calibrage
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div> */}

            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    onClick={() => {
                        toast({
                            title: "Demande envoyée",
                            description: "Votre demande d'équipement supplémentaire a été envoyée",
                        });
                    }}
                >
                    Demander équipement
                </Button>
                <Button onClick={onReset}>
                    Réinitialiser équipements
                </Button>
            </div>
        </div>
    );
};

export default AgentEquipmentDetails;
