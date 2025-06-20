import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Car, User, AlertTriangle, Search, Download, Plus, MapPin, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Types
interface SessionData {
    id: string;
    heure: string;
    type: 'conduite' | 'pause' | 'infraction';
    duree: number;
    vitesse: number;
    lieu: string;
    infractions: string[];
}

interface KPIData {
    tempsConducteTotal: number;
    tempsPauseTotal: number;
    nombreInfractions: number;
    vitesseMoyenne: number;
}

const ChronotachygrapheOverview: React.FC = () => {
    const [filters, setFilters] = useState({
        vehicule: '',
        conducteur: '',
        dateDebut: '',
        dateFin: ''
    });

    const navigate = useNavigate();

    // Données de démonstration
    const kpiData: KPIData = {
        tempsConducteTotal: 8.5,
        tempsPauseTotal: 2.0,
        nombreInfractions: 3,
        vitesseMoyenne: 72
    };

    const timelineData = [
        { heure: '06:00', conduite: 0, pause: 1, infraction: 0 },
        { heure: '08:00', conduite: 1, pause: 0, infraction: 0 },
        { heure: '10:00', conduite: 1, pause: 0, infraction: 1 },
        { heure: '12:00', conduite: 0, pause: 1, infraction: 0 },
        { heure: '14:00', conduite: 1, pause: 0, infraction: 0 },
        { heure: '16:00', conduite: 1, pause: 0, infraction: 1 },
        { heure: '18:00', conduite: 0, pause: 1, infraction: 0 },
    ];

    const sessionsData: SessionData[] = [
        {
            id: 'S001',
            heure: '08:00 - 10:00',
            type: 'conduite',
            duree: 2.0,
            vitesse: 85,
            lieu: 'Libreville - Owendo',
            infractions: ['Excès de vitesse']
        },
        {
            id: 'S002',
            heure: '10:00 - 10:30',
            type: 'pause',
            duree: 0.5,
            vitesse: 0,
            lieu: 'Station Owendo',
            infractions: []
        },
        {
            id: 'S003',
            heure: '10:30 - 12:00',
            type: 'conduite',
            duree: 1.5,
            vitesse: 75,
            lieu: 'Owendo - Port-Gentil',
            infractions: []
        },
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'conduite':
                return <Car className="h-4 w-4 text-green-600" />;
            case 'pause':
                return <Clock className="h-4 w-4 text-blue-600" />;
            case 'infraction':
                return <AlertTriangle className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'conduite':
                return <Badge className="bg-green-100 text-green-800">🚗 Conduite</Badge>;
            case 'pause':
                return <Badge className="bg-blue-100 text-blue-800">💤 Pause</Badge>;
            case 'infraction':
                return <Badge className="bg-red-100 text-red-800">⛔ Infraction</Badge>;
            default:
                return <Badge variant="secondary">{type}</Badge>;
        }
    };

    const handleExport = () => {
        console.log('Export des données chronotachygraphe');
    };

    const handleApplyFilters = () => {
        console.log('Application des filtres:', filters);
    };

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="h-6 w-6 text-blue-600" />
                        Chronotachygraphe
                    </h1>
                    <p className="text-muted-foreground">
                        Suivi et analyse des données de conduite en temps réel
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button onClick={handleExport} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Exporter
                    </Button>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Relevé manuel
                    </Button>
                </div>
            </div>

            {/* Filtres */}
            <Card>
                <CardHeader>
                    <CardTitle>Filtres de recherche</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Véhicule</label>
                            <Select value={filters.vehicule} onValueChange={(value) => setFilters({ ...filters, vehicule: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un véhicule" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GA-001-AB">GA-001-AB - Toyota Hilux</SelectItem>
                                    <SelectItem value="GA-002-CD">GA-002-CD - Nissan Patrol</SelectItem>
                                    <SelectItem value="GA-003-EF">GA-003-EF - Ford Ranger</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Conducteur</label>
                            <Select value={filters.conducteur} onValueChange={(value) => setFilters({ ...filters, conducteur: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un conducteur" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="C001">Jean MBONGO</SelectItem>
                                    <SelectItem value="C002">Marie NDONG</SelectItem>
                                    <SelectItem value="C003">Paul OBIANG</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Date début</label>
                            <Input
                                type="date"
                                value={filters.dateDebut}
                                onChange={(e) => setFilters({ ...filters, dateDebut: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Date fin</label>
                            <Input
                                type="date"
                                value={filters.dateFin}
                                onChange={(e) => setFilters({ ...filters, dateFin: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button onClick={handleApplyFilters}>
                            <Search className="h-4 w-4 mr-2" />
                            Appliquer les filtres
                        </Button>
                        <Button variant="outline">
                            <MapPin className="h-4 w-4 mr-2" />
                            Voir itinéraire
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Temps de conduite</CardTitle>
                        <Car className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{kpiData.tempsConducteTotal}h</div>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Temps de pause</CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{kpiData.tempsPauseTotal}h</div>
                        <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Infractions</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{kpiData.nombreInfractions}</div>
                        <p className="text-xs text-muted-foreground">Cette semaine</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vitesse moyenne</CardTitle>
                        <Car className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.vitesseMoyenne} km/h</div>
                        <p className="text-xs text-muted-foreground">Cette semaine</p>
                    </CardContent>
                </Card>
            </div>

            {/* Timeline journalière */}
            <Card>
                <CardHeader>
                    <CardTitle>Timeline journalière</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={timelineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="heure" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="conduite" name="Conduite" fill="#22c55e" />
                                <Bar dataKey="pause" name="Pause" fill="#3b82f6" />
                                <Bar dataKey="infraction" name="Infraction" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Tableau récapitulatif */}
            <Card>
                <CardHeader>
                    <CardTitle>Sessions du jour</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Heure</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Durée</TableHead>
                                <TableHead>Vitesse</TableHead>
                                <TableHead>Lieu</TableHead>
                                <TableHead>Infractions</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessionsData.map((session) => (
                                <TableRow key={session.id}>
                                    <TableCell className="font-medium">{session.heure}</TableCell>
                                    <TableCell>{getTypeBadge(session.type)}</TableCell>
                                    <TableCell>{session.duree}h</TableCell>
                                    <TableCell>{session.vitesse} km/h</TableCell>
                                    <TableCell>{session.lieu}</TableCell>
                                    <TableCell>
                                        {session.infractions.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {session.infractions.map((infraction, index) => (
                                                    <Badge key={index} variant="destructive" className="text-xs">
                                                        {infraction}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">Aucune</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/chronotachygraphe/overview/${session.id}`)}
                                            title="Détails"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}Add commentMore actions
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChronotachygrapheOverview;