import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    DollarSign,
    CreditCard,
    User,
    MapPin,
    Calendar,
    FileText,
    CheckCircle,
    Clock
} from 'lucide-react';
import mockData from '@/data/mockdata';

const TransactionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Trouver la transaction dans les données mock
    const transaction = mockData.transactions.find(t => t.id === id);

    if (!transaction) {
        return (
            <div className="container mx-auto p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Transaction non trouvée</h1>
                    <p className="text-gray-600 mt-2">La transaction demandée n'existe pas.</p>
                    <Button
                        onClick={() => navigate('/monitoring/transactions')}
                        className="mt-4"
                    >
                        Retour aux transactions
                    </Button>
                </div>
            </div>
        );
    }

    const formatMontant = (montant: number) => {
        return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
    };

    const getStatusIcon = (statut: string) => {
        return statut === 'payé' ?
            <CheckCircle className="h-5 w-5 text-green-600" /> :
            <Clock className="h-5 w-5 text-amber-600" />;
    };

    const getStatusBadge = (statut: string) => {
        return statut === 'payé' ?
            <Badge className="bg-green-100 text-green-800">Payé</Badge> :
            <Badge className="bg-amber-100 text-amber-800">En attente</Badge>;
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('/monitoring/transactions')}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Détails de la transaction</h1>
                    <p className="text-gray-600">{transaction.numéro}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Informations principales */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Informations de la transaction
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Numéro:</span>
                            <span className="font-medium">{transaction.numéro}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Clé de paiement:</span>
                            <span className="font-medium font-mono text-sm">{transaction.cléPaiement}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Montant:</span>
                            <span className="text-xl font-bold text-green-600">{formatMontant(transaction.montant)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Date:</span>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{new Date(transaction.date).toLocaleDateString('fr-GA')}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Statut:</span>
                            <div className="flex items-center gap-2">
                                {getStatusIcon(transaction.statut)}
                                {getStatusBadge(transaction.statut)}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Informations de l'agent */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Agent responsable
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">ID Agent:</span>
                            <span className="font-medium">{transaction.agentId}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Nom:</span>
                            <span className="font-medium">{transaction.agentNom}</span>
                        </div>

                        {transaction.localisation && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Localisation:</span>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{transaction.localisation}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Infractions liées */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Infractions liées
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {transaction.infractions.length > 0 ? (
                        <div className="space-y-3">
                            {transaction.infractions.map((infractionId, index) => {
                                const infraction = mockData.infractions.find(i => i.id === infractionId);
                                return (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{infractionId}</span>
                                            {infraction && (
                                                <Badge variant="outline">{infraction.type}</Badge>
                                            )}
                                        </div>
                                        {infraction && (
                                            <p className="text-sm text-gray-600 mt-1">{infraction.description}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500">Aucune infraction liée à cette transaction</p>
                    )}
                </CardContent>
            </Card>

            {/* Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Actions disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Télécharger le reçu
                        </Button>
                        <Button variant="outline">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Historique des paiements
                        </Button>
                        {transaction.statut === 'en_attente' && (
                            <Button>
                                Marquer comme payé
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionDetails;