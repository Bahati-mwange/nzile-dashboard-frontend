import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Clock, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

interface Conducteur {
    id: string;
    nom: string;
    prenom: string;
    matricule: string;
    permis: string;
    photo?: string;
    tempsConducteSemaine: number;
    tempsReposSemaine: number;
    infractions: number;
    statut: 'actif' | 'repos' | 'alerte';
}

const ChronotachygrapheConducteurs: React.FC = () => {
    const navigate = useNavigate();

    const conducteurs: Conducteur[] = [
        {
            id: 'C001',
            nom: 'MBONGO',
            prenom: 'Jean',
            matricule: 'MAT001',
            permis: 'GA-123456',
            tempsConducteSemaine: 42,
            tempsReposSemaine: 18,
            infractions: 2,
            statut: 'alerte'
        },
        {
            id: 'C002',
            nom: 'NDONG',
            prenom: 'Marie',
            matricule: 'MAT002',
            permis: 'GA-234567',
            tempsConducteSemaine: 38,
            tempsReposSemaine: 22,
            infractions: 0,
            statut: 'actif'
        },
        {
            id: 'C003',
            nom: 'OBIANG',
            prenom: 'Paul',
            matricule: 'MAT003',
            permis: 'GA-345678',
            tempsConducteSemaine: 35,
            tempsReposSemaine: 25,
            infractions: 1,
            statut: 'actif'
        }
    ];

    const statsData = [
        { semaine: 'S1', tempsConduite: 40, tempsRepos: 20 },
        { semaine: 'S2', tempsConduite: 38, tempsRepos: 22 },
        { semaine: 'S3', tempsConduite: 42, tempsRepos: 18 },
        { semaine: 'S4', tempsConduite: 35, tempsRepos: 25 },
    ];

    const getStatutBadge = (statut: string) => {
        switch (statut) {
            case 'actif':
                return <Badge className="bg-green-100 text-green-800">✅ Actif</Badge>;
            case 'repos':
                return <Badge className="bg-blue-100 text-blue-800">💤 En repos</Badge>;
            case 'alerte':
                return <Badge className="bg-red-100 text-red-800">⚠️ Alerte</Badge>;
            default:
                return <Badge variant="secondary">{statut}</Badge>;
        }
    };

    const handleVoirDetails = (conducteurId: string) => {
        navigate(`/chronotachygraphe/conducteur/${conducteurId}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <User className="h-6 w-6 text-blue-600" />
                        Suivi des Conducteurs
                    </h1>
                    <p className="text-muted-foreground">
                        Analyse des temps de conduite et de repos par conducteur
                    </p>
                </div>
            </div>

            {/* Statistiques globales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conducteurs actifs</CardTitle>
                        <User className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {conducteurs.filter(c => c.statut === 'actif').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">En alerte</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {conducteurs.filter(c => c.statut === 'alerte').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Moyenne conduite/semaine</CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {Math.round(conducteurs.reduce((acc, c) => acc + c.tempsConducteSemaine, 0) / conducteurs.length)}h
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Graphique d'évolution */}
            <Card>
                <CardHeader>
                    <CardTitle>Évolution hebdomadaire</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="semaine" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="tempsConduite" name="Temps de conduite" fill="#22c55e" />
                                <Bar dataKey="tempsRepos" name="Temps de repos" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Liste des conducteurs */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des conducteurs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Conducteur</TableHead>
                                <TableHead>Matricule</TableHead>
                                <TableHead>Permis</TableHead>
                                <TableHead>Temps conduite (semaine)</TableHead>
                                <TableHead>Temps repos (semaine)</TableHead>
                                <TableHead>Infractions</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {conducteurs.map((conducteur) => (
                                <TableRow key={conducteur.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={conducteur.photo} />
                                                <AvatarFallback>
                                                    {conducteur.prenom.charAt(0)}{conducteur.nom.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{conducteur.prenom} {conducteur.nom}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{conducteur.matricule}</TableCell>
                                    <TableCell>{conducteur.permis}</TableCell>
                                    <TableCell>
                                        <span className={conducteur.tempsConducteSemaine > 40 ? 'text-red-600 font-medium' : ''}>
                                            {conducteur.tempsConducteSemaine}h
                                        </span>
                                    </TableCell>
                                    <TableCell>{conducteur.tempsReposSemaine}h</TableCell>
                                    <TableCell>
                                        {conducteur.infractions > 0 ? (
                                            <Badge variant="destructive">{conducteur.infractions}</Badge>
                                        ) : (
                                            <span className="text-green-600">0</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{getStatutBadge(conducteur.statut)}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleVoirDetails(conducteur.id)}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Détails
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <TrendingUp className="h-4 w-4 mr-1" />
                                                Évolution
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/chronotachygraphe/conducteurs/${conducteur.id}`)}
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
    )
};

export default ChronotachygrapheConducteurs;