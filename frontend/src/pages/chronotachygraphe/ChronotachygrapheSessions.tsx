import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Car, User, Clock, AlertTriangle, Eye, Edit, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Session {
    id: string;
    vehicule: string;
    conducteur: string;
    dateDebut: string;
    dateFin: string;
    dureeTotal: number;
    typeSession: 'conduite' | 'pause' | 'repos';
    vitesseMoyenne: number;
    vitesseMax: number;
    distance: number;
    infractions: string[];
    statut: 'en_cours' | 'terminee' | 'anomalie';
}

const ChronotachygrapheSessions: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        vehicule: '',
        conducteur: '',
        statut: '',
        dateDebut: '',
        dateFin: ''
    });

    const sessions: Session[] = [
        {
            id: 'SES001',
            vehicule: 'GA-001-AB (Toyota Hilux)',
            conducteur: 'Jean MBONGO',
            dateDebut: '2025-01-18 08:00',
            dateFin: '2025-01-18 16:30',
            dureeTotal: 8.5,
            typeSession: 'conduite',
            vitesseMoyenne: 72,
            vitesseMax: 95,
            distance: 345,
            infractions: ['Excès de vitesse', 'Temps de conduite dépassé'],
            statut: 'anomalie'
        },
        {
            id: 'SES002',
            vehicule: 'GA-002-CD (Nissan Patrol)',
            conducteur: 'Marie NDONG',
            dateDebut: '2025-01-18 09:00',
            dateFin: '2025-01-18 17:00',
            dureeTotal: 8.0,
            typeSession: 'conduite',
            vitesseMoyenne: 68,
            vitesseMax: 85,
            distance: 280,
            infractions: [],
            statut: 'terminee'
        },
        {
            id: 'SES003',
            vehicule: 'GA-001-AB (Toyota Hilux)',
            conducteur: 'Jean MBONGO',
            dateDebut: '2025-01-18 18:00',
            dateFin: '',
            dureeTotal: 2.5,
            typeSession: 'conduite',
            vitesseMoyenne: 65,
            vitesseMax: 78,
            distance: 125,
            infractions: [],
            statut: 'en_cours'
        }
    ];

    const getStatutBadge = (statut: string) => {
        switch (statut) {
            case 'en_cours':
                return <Badge className="bg-blue-100 text-blue-800">🔄 En cours</Badge>;
            case 'terminee':
                return <Badge className="bg-green-100 text-green-800">✅ Terminée</Badge>;
            case 'anomalie':
                return <Badge className="bg-red-100 text-red-800">⚠️ Anomalie</Badge>;
            default:
                return <Badge variant="secondary">{statut}</Badge>;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'conduite':
                return <Badge className="bg-green-100 text-green-800">🚗 Conduite</Badge>;
            case 'pause':
                return <Badge className="bg-blue-100 text-blue-800">💤 Pause</Badge>;
            case 'repos':
                return <Badge className="bg-purple-100 text-purple-800">🛌 Repos</Badge>;
            default:
                return <Badge variant="secondary">{type}</Badge>;
        }
    };

    const handleVoirDetails = (sessionId: string) => {
        navigate(`/chronotachygraphe/session/${sessionId}`);
    };

    const handleRejouerTrajet = (sessionId: string) => {
        console.log('Rejouer trajet pour session:', sessionId);
    };

    const handleModifierSession = (sessionId: string) => {
        console.log('Modifier session:', sessionId);
    };

    const handleApplyFilters = () => {
        console.log('Application des filtres:', filters);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="h-6 w-6 text-blue-600" />
                        Sessions Chronotachygraphe
                    </h1>
                    <p className="text-muted-foreground">
                        Historique et détails des sessions d'enregistrement tachygraphique
                    </p>
                </div>
            </div>

            {/* Filtres */}
            <Card>
                <CardHeader>
                    <CardTitle>Filtres de recherche</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Véhicule</label>
                            <Select value={filters.vehicule} onValueChange={(value) => setFilters({ ...filters, vehicule: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les véhicules" />
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
                                    <SelectValue placeholder="Tous les conducteurs" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jean">Jean MBONGO</SelectItem>
                                    <SelectItem value="marie">Marie NDONG</SelectItem>
                                    <SelectItem value="paul">Paul OBIANG</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Statut</label>
                            <Select value={filters.statut} onValueChange={(value) => setFilters({ ...filters, statut: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les statuts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en_cours">En cours</SelectItem>
                                    <SelectItem value="terminee">Terminée</SelectItem>
                                    <SelectItem value="anomalie">Anomalie</SelectItem>
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

                    <div className="mt-4">
                        <Button onClick={handleApplyFilters}>
                            Appliquer les filtres
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sessions actives</CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {sessions.filter(s => s.statut === 'en_cours').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sessions terminées</CardTitle>
                        <FileText className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {sessions.filter(s => s.statut === 'terminee').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Anomalies détectées</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {sessions.filter(s => s.statut === 'anomalie').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Distance totale</CardTitle>
                        <Car className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {sessions.reduce((acc, s) => acc + s.distance, 0)} km
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Liste des sessions */}
            <Card>
                <CardHeader>
                    <CardTitle>Historique des sessions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Session</TableHead>
                                <TableHead>Véhicule</TableHead>
                                <TableHead>Conducteur</TableHead>
                                <TableHead>Période</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Durée</TableHead>
                                <TableHead>Vitesse moy.</TableHead>
                                <TableHead>Distance</TableHead>
                                <TableHead>Infractions</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessions.map((session) => (
                                <TableRow key={session.id}>
                                    <TableCell className="font-medium">{session.id}</TableCell>
                                    <TableCell>{session.vehicule}</TableCell>
                                    <TableCell>{session.conducteur}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>{session.dateDebut}</div>
                                            {session.dateFin && <div className="text-muted-foreground">{session.dateFin}</div>}
                                        </div>
                                    </TableCell>
                                    <TableCell>{getTypeBadge(session.typeSession)}</TableCell>
                                    <TableCell>{session.dureeTotal}h</TableCell>
                                    <TableCell>{session.vitesseMoyenne} km/h</TableCell>
                                    <TableCell>{session.distance} km</TableCell>
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
                                            <span className="text-green-600">Aucune</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{getStatutBadge(session.statut)}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleVoirDetails(session.id)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRejouerTrajet(session.id)}
                                            >
                                                <MapPin className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleModifierSession(session.id)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/chronotachygraphe/sessions/${session.id}`)}
                                            title="Détails"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChronotachygrapheSessions;