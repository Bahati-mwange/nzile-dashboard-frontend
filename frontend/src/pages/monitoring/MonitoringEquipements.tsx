
import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, MapPin, Monitor, Battery, Signal } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import MonitoringFilters from '@/components/monitoring/MonitoringFilters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Type pour les équipements
type Equipement = {
    id: string;
    nom: string;
    type: 'camera' | 'radar' | 'station';
    série: string;
    statut: 'actif' | 'inactif' | 'maintenance';
    localisation: string;
    dateInstallation: string;
    niveauBatterie?: number;
    signalRéseau?: number;
    dernièreMaintenance?: string;
};

// Générer des données pour les équipements
const générerDonnéesEquipements = (): Equipement[] => [
    {
        id: "EQ001",
        nom: "Caméra PK12",
        type: "camera",
        série: "CAM-2023-001",
        statut: "actif",
        localisation: "Rond-point PK12, Libreville",
        dateInstallation: "2025-01-15",
        niveauBatterie: 85,
        signalRéseau: 90,
        dernièreMaintenance: "2025-04-10"
    },
    {
        id: "EQ002",
        nom: "Radar Kango",
        type: "radar",
        série: "RAD-2023-015",
        statut: "actif",
        localisation: "Route Nationale 1, Kango",
        dateInstallation: "2025-02-20",
        niveauBatterie: 75,
        signalRéseau: 65,
        dernièreMaintenance: "2025-04-25"
    },
    {
        id: "EQ003",
        nom: "Station Owendo",
        type: "station",
        série: "STA-2023-008",
        statut: "maintenance",
        localisation: "Port d'Owendo",
        dateInstallation: "2024-11-10",
        niveauBatterie: 30,
        signalRéseau: 85,
        dernièreMaintenance: "2025-05-01"
    },
    {
        id: "EQ004",
        nom: "Caméra Carrefour IAI",
        type: "camera",
        série: "CAM-2023-012",
        statut: "actif",
        localisation: "Carrefour IAI, Libreville",
        dateInstallation: "2025-03-05",
        niveauBatterie: 92,
        signalRéseau: 95,
        dernièreMaintenance: "2025-04-15"
    },
    {
        id: "EQ005",
        nom: "Radar Ntoum",
        type: "radar",
        série: "RAD-2023-022",
        statut: "inactif",
        localisation: "Route Nationale 1, Ntoum",
        dateInstallation: "2024-12-08",
        niveauBatterie: 15,
        signalRéseau: 30,
        dernièreMaintenance: "2025-03-20"
    }
];

const MonitoringEquipements: React.FC = () => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = React.useState<Equipement[] | null>(null);
    const { données: equipements, chargement } = useApiData<Equipement[]>(
        'https://votre-api.com/equipements',
        undefined,
        générerDonnéesEquipements
    );

    const handleSearch = (term: string) => {
        if (!equipements) return;

        if (!term.trim()) {
            setSearchResults(null); // Reset to show all
            return;
        }

        const results = equipements.filter(eq =>
            eq.nom.toLowerCase().includes(term.toLowerCase()) ||
            eq.localisation.toLowerCase().includes(term.toLowerCase()) ||
            eq.série.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(results);
    };

    const handleExport = (format: 'csv' | 'pdf') => {
        const dataToExport = searchResults || equipements || [];

        // Get current date and time for filename
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `equipements_${dateStr}_${timeStr}`;

        if (format === 'csv') {
            exportToCSV(dataToExport, filename);
        } else if (format === 'pdf') {
            exportToPDF(dataToExport, filename);
        }

        // Show notification
        const formatName = format === 'csv' ? 'CSV' : 'PDF';
        alert(`Export ${formatName} lancé : ${filename}.${format}`);
    };

    // Function to export data as CSV
    const exportToCSV = (data: Equipement[], filename: string) => {
        const headers = ["ID", "Nom", "Type", "Série", "Statut", "Localisation", "Installation", "Batterie", "Signal", "Dernière Maintenance"];

        const csvContent = [
            headers.join(','),
            ...data.map(item => [
                item.id,
                `"${item.nom}"`,
                item.type,
                item.série,
                item.statut,
                `"${item.localisation}"`,
                item.dateInstallation,
                item.niveauBatterie || 'N/A',
                item.signalRéseau || 'N/A',
                item.dernièreMaintenance || 'N/A'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Function to export data as PDF (mock implementation)
    const exportToPDF = (data: Equipement[], filename: string) => {
        console.log(`Exporting ${data.length} equipment items to PDF as ${filename}.pdf`);
        // In a real implementation, you would use a library like jsPDF or pdfmake
        // to create and download a PDF file
    };

    const getTypeIcon = (type: 'camera' | 'radar' | 'station') => {
        switch (type) {
            case 'camera':
                return <Camera className="h-4 w-4 mr-1" />;
            case 'radar':
                return <Monitor className="h-4 w-4 mr-1" />;
            case 'station':
                return <MapPin className="h-4 w-4 mr-1" />;
        }
    };

    const getStatusBadge = (status: 'actif' | 'inactif' | 'maintenance') => {
        switch (status) {
            case 'actif':
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Actif</Badge>;
            case 'inactif':
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Inactif</Badge>;
            case 'maintenance':
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Maintenance</Badge>;
        }
    };

    const getBatteryStatus = (level?: number) => {
        if (level === undefined) return null;

        let colorClass = "text-green-600";
        if (level < 30) colorClass = "text-red-600";
        else if (level < 70) colorClass = "text-amber-600";

        return (
            <div className="flex items-center">
                <Battery className={`h-4 w-4 mr-1 ${colorClass}`} />
                <span className={colorClass}>{level}%</span>
            </div>
        );
    };

    const getSignalStatus = (level?: number) => {
        if (level === undefined) return null;

        let colorClass = "text-green-600";
        if (level < 30) colorClass = "text-red-600";
        else if (level < 70) colorClass = "text-amber-600";

        return (
            <div className="flex items-center">
                <Signal className={`h-4 w-4 mr-1 ${colorClass}`} />
                <span className={colorClass}>{level}%</span>
            </div>
        );
    };

    // Choose which data to display based on search results
    const displayData = searchResults || equipements || [];

    return (
        <div className="space-y-6">
            <MonitoringFilters
                title="Suivi des Équipements"
                onSearch={handleSearch}
                onPeriodChange={(period) => console.log("Période:", period)}
                onExport={handleExport}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Monitor className="h-6 w-6 text-blue-700" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Équipements</p>
                                <p className="text-2xl font-bold">{equipements?.length || 0}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Camera className="h-6 w-6 text-green-700" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Caméras</p>
                                <p className="text-2xl font-bold">
                                    {equipements?.filter(e => e.type === 'camera').length || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <Monitor className="h-6 w-6 text-purple-700" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Radars</p>
                                <p className="text-2xl font-bold">
                                    {equipements?.filter(e => e.type === 'radar').length || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-amber-100 p-3 rounded-full">
                                <MapPin className="h-6 w-6 text-amber-700" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Stations</p>
                                <p className="text-2xl font-bold">
                                    {equipements?.filter(e => e.type === 'station').length || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6">
                    {chargement ? (
                        <p>Chargement des données des équipements...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Numéro de série</TableHead>
                                        <TableHead>Localisation</TableHead>
                                        <TableHead>Date d'installation</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Batterie</TableHead>
                                        <TableHead>Signal</TableHead>
                                        <TableHead>Dernière maintenance</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={10} className="text-center py-4">
                                                Aucun équipement trouvé
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        displayData.map((equipement) => (
                                            <TableRow key={equipement.id}>
                                                <TableCell className="font-medium">{equipement.nom}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        {getTypeIcon(equipement.type)}
                                                        <span className="capitalize">{equipement.type}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{equipement.série}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                                                        {equipement.localisation}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{equipement.dateInstallation}</TableCell>
                                                <TableCell>{getStatusBadge(equipement.statut)}</TableCell>
                                                <TableCell>{getBatteryStatus(equipement.niveauBatterie)}</TableCell>
                                                <TableCell>{getSignalStatus(equipement.signalRéseau)}</TableCell>
                                                <TableCell>{equipement.dernièreMaintenance || 'N/A'}</TableCell>
                                                <Button variant="ghost" size="sm"
                                                    onClick={() => navigate(`/equipements/${equipement.id}`)}
                                                >Détails</Button>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MonitoringEquipements;