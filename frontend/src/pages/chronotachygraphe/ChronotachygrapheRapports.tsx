import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, BarChart, PieChart, TrendingUp, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RapportTemplate {
    id: string;
    nom: string;
    description: string;
    type: 'hebdomadaire' | 'mensuel' | 'personnalise';
    formatExport: string[];
    icone: React.ReactNode;
}

const ChronotachygrapheRapports: React.FC = () => {
    const [filters, setFilters] = useState({
        periode: '',
        conducteur: '',
        vehicule: '',
        typeRapport: '',
        format: 'pdf'
    });

    const navigate = useNavigate();

    const templatesRapports: RapportTemplate[] = [
        {
            id: 'hebdo-conducteur',
            nom: 'Rapport hebdomadaire conducteurs',
            description: 'Temps de conduite, repos et infractions par conducteur sur 7 jours',
            type: 'hebdomadaire',
            formatExport: ['PDF', 'Excel', 'CSV'],
            icone: <BarChart className="h-6 w-6 text-blue-600" />
        },
        {
            id: 'mensuel-vehicules',
            nom: 'Rapport mensuel véhicules',
            description: 'Utilisation, kilométrage et maintenance des véhicules sur 30 jours',
            type: 'mensuel',
            formatExport: ['PDF', 'Excel'],
            icone: <PieChart className="h-6 w-6 text-green-600" />
        },
        {
            id: 'infractions-detail',
            nom: 'Rapport détaillé infractions',
            description: 'Analyse complète des infractions détectées par le chronotachygraphe',
            type: 'personnalise',
            formatExport: ['PDF', 'Excel', 'CSV'],
            icone: <TrendingUp className="h-6 w-6 text-red-600" />
        },
        {
            id: 'compliance-reglementaire',
            nom: 'Rapport de conformité réglementaire',
            description: 'Respect des temps de conduite et repos selon la réglementation gabonaise',
            type: 'mensuel',
            formatExport: ['PDF'],
            icone: <FileText className="h-6 w-6 text-purple-600" />
        }
    ];

    const historicRapports = [
        {
            id: 'R001',
            nom: 'Rapport hebdomadaire S03-2025',
            type: 'Hebdomadaire conducteurs',
            dateGeneration: '2025-01-18 10:30',
            statut: 'complete',
            taille: '2.3 MB'
        },
        {
            id: 'R002',
            nom: 'Rapport mensuel Décembre 2024',
            type: 'Mensuel véhicules',
            dateGeneration: '2025-01-05 14:15',
            statut: 'complete',
            taille: '5.7 MB'
        },
        {
            id: 'R003',
            nom: 'Infractions Q4-2024',
            type: 'Détaillé infractions',
            dateGeneration: '2025-01-15 09:00',
            statut: 'en_cours',
            taille: '-'
        }
    ];

    const handleGenererRapport = (templateId: string) => {
        console.log('Génération du rapport:', templateId, 'avec filtres:', filters);
    };

    const handleTelechargerRapport = (rapportId: string) => {
        console.log('Téléchargement du rapport:', rapportId);
    };

    const getStatutBadge = (statut: string) => {
        switch (statut) {
            case 'complete':
                return <Badge className="bg-green-100 text-green-800">✅ Complété</Badge>;
            case 'en_cours':
                return <Badge className="bg-blue-100 text-blue-800">⏳ En cours</Badge>;
            case 'erreur':
                return <Badge className="bg-red-100 text-red-800">❌ Erreur</Badge>;
            default:
                return <Badge variant="secondary">{statut}</Badge>;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'hebdomadaire':
                return <Badge variant="outline" className="bg-blue-50">📅 Hebdomadaire</Badge>;
            case 'mensuel':
                return <Badge variant="outline" className="bg-green-50">📆 Mensuel</Badge>;
            case 'personnalise':
                return <Badge variant="outline" className="bg-purple-50">⚙️ Personnalisé</Badge>;
            default:
                return <Badge variant="secondary">{type}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Download className="h-6 w-6 text-blue-600" />
                        Rapports & Export
                    </h1>
                    <p className="text-muted-foreground">
                        Génération et téléchargement des rapports chronotachygraphe
                    </p>
                </div>
            </div>

            {/* Filtres globaux */}
            <Card>
                <CardHeader>
                    <CardTitle>Paramètres d'export</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Période</label>
                            <Select value={filters.periode} onValueChange={(value) => setFilters({ ...filters, periode: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner période" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7j">7 derniers jours</SelectItem>
                                    <SelectItem value="30j">30 derniers jours</SelectItem>
                                    <SelectItem value="3m">3 derniers mois</SelectItem>
                                    <SelectItem value="custom">Période personnalisée</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Conducteur</label>
                            <Select value={filters.conducteur} onValueChange={(value) => setFilters({ ...filters, conducteur: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les conducteurs" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tous">Tous les conducteurs</SelectItem>
                                    <SelectItem value="jean">Jean MBONGO</SelectItem>
                                    <SelectItem value="marie">Marie NDONG</SelectItem>
                                    <SelectItem value="paul">Paul OBIANG</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Véhicule</label>
                            <Select value={filters.vehicule} onValueChange={(value) => setFilters({ ...filters, vehicule: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les véhicules" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tous">Tous les véhicules</SelectItem>
                                    <SelectItem value="GA-001-AB">GA-001-AB - Toyota Hilux</SelectItem>
                                    <SelectItem value="GA-002-CD">GA-002-CD - Nissan Patrol</SelectItem>
                                    <SelectItem value="GA-003-EF">GA-003-EF - Ford Ranger</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Format</label>
                            <Select value={filters.format} onValueChange={(value) => setFilters({ ...filters, format: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Format d'export" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">PDF</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="csv">CSV</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end">
                            <Button className="w-full">
                                <Calendar className="h-4 w-4 mr-2" />
                                Programmer
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Templates de rapports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templatesRapports.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    {template.icone}
                                    <div>
                                        <CardTitle className="text-lg">{template.nom}</CardTitle>
                                        <div className="mt-1">{getTypeBadge(template.type)}</div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">
                                {template.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {template.formatExport.map((format) => (
                                    <Badge key={format} variant="outline" className="text-xs">
                                        {format}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <Button
                                    className="w-full"
                                    onClick={() => handleGenererRapport(template.id)}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Générer le rapport
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => navigate(`/chronotachygraphe/rapports/${template.id}`)}
                                    title="Détails"
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Historique des rapports */}
            <Card>
                <CardHeader>
                    <CardTitle>Historique des rapports générés</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {historicRapports.map((rapport) => (
                            <div key={rapport.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <FileText className="h-8 w-8 text-blue-600" />
                                    <div>
                                        <div className="font-medium">{rapport.nom}</div>
                                        <div className="text-sm text-muted-foreground">{rapport.type}</div>
                                        <div className="text-xs text-muted-foreground">
                                            Généré le {rapport.dateGeneration} • {rapport.taille}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {getStatutBadge(rapport.statut)}
                                    {rapport.statut === 'complete' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleTelechargerRapport(rapport.id)}
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            Télécharger
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChronotachygrapheRapports;