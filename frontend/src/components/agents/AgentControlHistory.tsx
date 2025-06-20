
import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, FileWarning, Calendar } from 'lucide-react';

interface AgentControlHistoryProps {
    agentId: string;
}

interface ControlItem {
    id: string;
    date: string;
    lieu: string;
    véhicules: number;
    infractions: number;
    montant: number;
    statut: 'terminé' | 'en cours' | 'planifié';
}

const générerHistoriqueControles = (agentId: string): ControlItem[] => {
    const baseDate = new Date();

    return [
        {
            id: `${agentId}-C001`,
            date: new Date(baseDate.setDate(baseDate.getDate() - 1)).toISOString().split('T')[0],
            lieu: 'Carrefour SNI, Libreville',
            véhicules: 45,
            infractions: 8,
            montant: 375000,
            statut: 'terminé'
        },
        {
            id: `${agentId}-C002`,
            date: new Date(baseDate.setDate(baseDate.getDate() - 3)).toISOString().split('T')[0],
            lieu: 'PK12, Route nationale 1',
            véhicules: 67,
            infractions: 12,
            montant: 520000,
            statut: 'terminé'
        },
        {
            id: `${agentId}-C003`,
            date: new Date().toISOString().split('T')[0],
            lieu: 'Rond-point de la Démocratie',
            véhicules: 18,
            infractions: 3,
            montant: 125000,
            statut: 'en cours'
        },
        {
            id: `${agentId}-C004`,
            date: new Date(baseDate.setDate(baseDate.getDate() + 2)).toISOString().split('T')[0],
            lieu: 'Carrefour IAI, Libreville',
            véhicules: 0,
            infractions: 0,
            montant: 0,
            statut: 'planifié'
        }
    ];
};

const formaterNombre = (nombre: number) => {
    return nombre.toLocaleString('fr-FR');
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
};

const AgentControlHistory: React.FC<AgentControlHistoryProps> = ({ agentId }) => {
    const { données: controls, chargement } = useApiData<ControlItem[]>(
        `https://votre-api.com/agents/${agentId}/controls`,
        undefined,
        () => générerHistoriqueControles(agentId)
    );

    const getStatutBadge = (statut: string) => {
        switch (statut) {
            case 'terminé':
                return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Terminé</Badge>;
            case 'en cours':
                return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">En cours</Badge>;
            case 'planifié':
                return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">Planifié</Badge>;
            default:
                return <Badge variant="outline">{statut}</Badge>;
        }
    };

    return (
        <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Historique des contrôles routiers
            </h3>

            {chargement ? (
                <p>Chargement de l'historique...</p>
            ) : controls && controls.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Lieu</TableHead>
                            <TableHead className="text-center">Véhicules</TableHead>
                            <TableHead className="text-center">Infractions</TableHead>
                            <TableHead className="text-right">Montant</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {controls.map((control) => (
                            <TableRow key={control.id}>
                                <TableCell>{formatDate(control.date)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                        {control.lieu}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">{control.véhicules}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                        {control.infractions > 0 && <FileWarning className="h-3.5 w-3.5 text-red-500" />}
                                        {control.infractions}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    {formaterNombre(control.montant)} FCFA
                                </TableCell>
                                <TableCell>{getStatutBadge(control.statut)}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => window.location.href = `/controls/${control.id}`}
                                    >
                                        Détails
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-muted-foreground text-center py-8">
                    Aucun historique de contrôle pour cet agent
                </p>
            )}
        </div>
    );
};

export default AgentControlHistory;