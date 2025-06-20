
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, GraduationCap, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Fake data for candidates
const candidatesData = [
  { 
    id: '1', 
    name: 'Thomas Eko', 
    registrationNumber: 'C-2025-001',
    birthDate: '1998-05-12',
    licenseType: 'B', 
    school: 'Auto-École Centrale',
    examDate: '2025-06-10', 
    status: 'registered' 
  },
  { 
    id: '2', 
    name: 'Jeanne Owoula', 
    registrationNumber: 'C-2025-002',
    birthDate: '1995-02-18',
    licenseType: 'A', 
    school: 'Auto-École Avenir',
    examDate: '2025-06-10', 
    status: 'registered' 
  },
  { 
    id: '3', 
    name: 'Marc Bivigou', 
    registrationNumber: 'C-2025-003',
    birthDate: '2000-11-23',
    licenseType: 'B', 
    school: 'Auto-École Express',
    examDate: '2025-05-15', 
    status: 'passed' 
  },
  { 
    id: '4', 
    name: 'Emilie Nzinga', 
    registrationNumber: 'C-2025-004',
    birthDate: '1997-08-05',
    licenseType: 'C', 
    school: 'Auto-École Centrale',
    examDate: '2025-05-15', 
    status: 'failed' 
  },
  { 
    id: '5', 
    name: 'Henri Mba', 
    registrationNumber: 'C-2025-005',
    birthDate: '1999-04-30',
    licenseType: 'B,D', 
    school: 'Auto-École Express',
    examDate: '2025-06-20', 
    status: 'registered' 
  },
];

// Status badge styles
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'registered':
      return <Badge className="bg-blue-500">Inscrit</Badge>;
    case 'passed':
      return <Badge className="bg-green-500">Réussi</Badge>;
    case 'failed':
      return <Badge className="bg-red-500">Échoué</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Candidates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter candidates based on search query
  const filteredCandidates = candidatesData.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats data
  const registeredCandidates = candidatesData.filter(candidate => candidate.status === 'registered').length;
  const passedCandidates = candidatesData.filter(candidate => candidate.status === 'passed').length;
  const failedCandidates = candidatesData.filter(candidate => candidate.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidats</h1>
          <p className="text-muted-foreground">
            Gestion des candidats aux examens du permis de conduire
          </p>
        </div>
        <Button className="bg-gabon-blue hover:bg-gabon-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un candidat
        </Button>
      </div>

      {/* Statistics cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Candidats inscrits</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{registeredCandidates}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Examens réussis</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{passedCandidates}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Examens échoués</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-2xl font-bold text-red-600">{failedCandidates}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filter */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un candidat par nom ou numéro d'inscription..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Candidates table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Inscription</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Auto-école</TableHead>
              <TableHead>Date d'examen</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                  Aucun candidat trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.registrationNumber}</TableCell>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.birthDate}</TableCell>
                  <TableCell>{candidate.licenseType}</TableCell>
                  <TableCell>{candidate.school}</TableCell>
                  <TableCell>{candidate.examDate}</TableCell>
                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Candidates;
