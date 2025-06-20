
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
import { DollarSign } from 'lucide-react';

interface AgentTransactionHistoryProps {
    agentId: string;
}

interface TransactionItem {
    id: string;
    date: string;
    montant: number;
    référence: string;
    type: 'amende' | 'permis' | 'vignette';
    méthode: 'mobile' | 'carte' | 'espèces';
}

const générerHistoriqueTransactions = (agentId: string): TransactionItem[] => {
    const baseDate = new Date();

    return [
        {
            id: `${agentId}-T001`,
            date: new Date(baseDate.setDate(baseDate.getDate() - 1)).toISOString(),
            montant: 75000,
            référence: 'AM-2025-0045',
            type: 'amende',
            méthode: 'mobile'
        },
        {
            id: `${agentId}-T002`,
            date: new Date(baseDate.setDate(baseDate.getDate() - 2)).toISOString(),
            montant: 55000,
            référence: 'AM-2025-0032',
            type: 'amende',
            méthode: 'espèces'
        },
        {
            id: `${agentId}-T003`,
            date: new Date(baseDate.setDate(baseDate.getDate() - 3)).toISOString(),
            montant: 150000,
            référence: 'PR-2025-0078',
            type: 'permis',
            méthode: 'carte'
        },
        {
            id: `${agentId}-T004`,
            date: new Date(baseDate.setDate(baseDate.getDate() - 5)).toISOString(),
            montant: 35000,
            référence: 'VG-2025-0124',
            type: 'vignette',
            méthode: 'mobile'
        }
    ];
};

const formaterNombre = (nombre: number) => {
    return nombre.toLocaleString('fr-FR');
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getPaymentMethodBadge = (method: string) => {
    switch (method) {
        case 'mobile':
            return <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Mobile Money</span>;
        case 'carte':
            return <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Carte bancaire</span>;
        case 'espèces':
            return <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Espèces</span>;
        default:
            return <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">{method}</span>;
    }
};

const getTypeBadge = (type: string) => {
    switch (type) {
        case 'amende':
            return <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Amende</span>;
        case 'permis':
            return <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">Permis</span>;
        case 'vignette':
            return <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded">Vignette</span>;
        default:
            return <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">{type}</span>;
    }
};

const AgentTransactionHistory: React.FC<AgentTransactionHistoryProps> = ({ agentId }) => {
    const { données: transactions, chargement } = useApiData<TransactionItem[]>(
        `https://votre-api.com/agents/${agentId}/transactions`,
        undefined,
        () => générerHistoriqueTransactions(agentId)
    );

    return (
        <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Historique des transactions
            </h3>

            {chargement ? (
                <p>Chargement des transactions...</p>
            ) : transactions && transactions.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Référence</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Méthode</TableHead>
                            <TableHead className="text-right">Montant</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{formatDate(transaction.date)}</TableCell>
                                <TableCell className="font-medium">{transaction.référence}</TableCell>
                                <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                                <TableCell>{getPaymentMethodBadge(transaction.méthode)}</TableCell>
                                <TableCell className="text-right font-medium">
                                    {formaterNombre(transaction.montant)} FCFA
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => window.location.href = `/transaction-details/${transaction.id}`}
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
                    Aucune transaction enregistrée pour cet agent
                </p>
            )}
        </div>
    );
};

export default AgentTransactionHistory;