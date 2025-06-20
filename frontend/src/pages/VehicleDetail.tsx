import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft, Car, FileText, ClipboardCheck, Building, History, ShieldCheck, User,
  Calendar, FileImage, AlertTriangle, Wrench, MapPin, CheckCircle, XCircle,
  Printer, Download, Clock, Info, CalendarClock, ArrowRight
} from "lucide-react";
import TechnicalInspection from "@/components/vehicles/TechnicalInspection";
import InsuranceDetails from "@/components/vehicles/InsuranceDetails";
import OwnershipHistory from "@/components/vehicles/OwnershipHistory";
import RegistrationDocuments from "@/components/vehicles/RegistrationDocuments";
import CompanyAssignments from "@/components/vehicles/CompanyAssignments";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useApiData } from "@/hooks/useApiData";

// Types pour les données du véhicule
interface VehicleDetailData {
  id: string;
  num_serie: string;
  marque: string;
  genre: string;
  type: string;
  date_premiere_mise_en_service: string;
  puissance_administrative: number;
  source_energie: string;
  charge_utile: number;
  poids_vide: number;
  poids_total_autorise: number;
  est_neuf: boolean;
  proprietaire_actuel: {
    type: 'Personne' | 'Organisation';
    nom?: string;
    prenom?: string;
    telephone?: string;
    adresse?: string;
    sexe?: 'M' | 'F';
    email?: string;
    nom_organisation?: string;
  };
  immatriculation: {
    numero: string;
    pays: string;
    type_plaque: string;
    carrosserie: string;
  };
  carte_grise: {
    date_delivrance: string;
    lieu_delivrance: string;
    type_proprietaire: 'Personne' | 'Organisation';
    image_scannee: string;
    historique?: {
      date_delivrance: string;
      lieu_delivrance: string;
      image_scannee: string;
    }[];
  };
  historique_proprietaires: {
    id: string;
    date_debut: string;
    date_fin?: string;
    type_proprietaire: 'Personne' | 'Organisation';
    nom?: string;
    prenom?: string;
    nom_organisation?: string;
    numero_plaque: string;
    est_actuel: boolean;
  }[];
  affectations: {
    id: string;
    conducteur_nom: string;
    conducteur_prenom: string;
    date_debut: string;
    date_fin?: string;
    observations?: string;
    est_actuel: boolean;
  }[];
  documents_administratifs: {
    id: string;
    type_document: 'permis' | 'carte_grise' | 'autre';
    date_modification: string;
    img_avant?: string;
    img_apres?: string;
    description?: string;
  }[];
  pieces_identite?: {
    type_piece: string;
    numero: string;
    date_delivrance: string;
    date_expiration: string;
    images: string[];
  };
  assurances: {
    id: string;
    compagnie: string;
    numero_police: string;
    date_debut: string;
    date_fin: string;
    est_expire: boolean;
  }[];
  visites_techniques: {
    id: string;
    date: string;
    validite_mois: number;
    date_expiration: string;
    resultat: 'conforme' | 'non_conforme' | 'conforme_avec_reserves';
    est_expire: boolean;
  }[];
  controles_routiers: {
    id: string;
    date: string;
    lieu: string;
    agent: string;
    type_controle: string;
    resultat: string;
    documents_scannes: string[];
    amendes: {
      id: string;
      montant: number;
      motif: string;
      date_paiement?: string;
      est_payee: boolean;
    }[];
  }[];
}

// Mock data pour les tests
const generateMockVehicleData = (id: string): VehicleDetailData => {
  const isCompany = id === '4';
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const sixMonthsLater = new Date(today);
  sixMonthsLater.setMonth(today.getMonth() + 6);

  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  const isExpired = id === '3';

  return {
    id,
    num_serie: `NS${id}12345678${id}`,
    marque: ['Toyota', 'Hyundai', 'Peugeot', 'Mitsubishi'][Number(id) - 1],
    genre: ['SUV', 'Berline', 'Camionnette', '4x4'][Number(id) - 1],
    type: ['Land Cruiser', 'Tucson', '3008', 'Pajero'][Number(id) - 1],
    date_premiere_mise_en_service: [
      '15/06/2021',
      '23/03/2019',
      '12/09/2018',
      '05/11/2020'
    ][Number(id) - 1],
    puissance_administrative: [12, 8, 9, 15][Number(id) - 1],
    source_energie: ['Diesel', 'Essence', 'Diesel', 'Diesel'][Number(id) - 1],
    charge_utile: [800, 600, 750, 1200][Number(id) - 1],
    poids_vide: [2100, 1800, 1600, 2400][Number(id) - 1],
    poids_total_autorise: [2900, 2400, 2350, 3600][Number(id) - 1],
    est_neuf: [false, false, false, false][Number(id) - 1],
    proprietaire_actuel: isCompany ? {
      type: 'Organisation',
      nom_organisation: 'SODEXAF',
      telephone: '+241 77 12 34 56',
      adresse: '123 Avenue de l\'Exploitation, Libreville'
    } : {
      type: 'Personne',
      nom: ['Ndong Mba', 'Ondo', 'Moussavou', ''][Number(id) - 1],
      prenom: ['Jean', 'Sophie', 'Pierre', ''][Number(id) - 1],
      telephone: '+241 66 12 34 56',
      adresse: '45 Rue des Palmiers, Libreville',
      sexe: ['M', 'F', 'M', ''][Number(id) - 1] as 'M' | 'F',
      email: 'proprietaire@example.com'
    },
    immatriculation: {
      numero: [`GA-${id}23-LBV`, `GA-45${id}-POG`, `GA-78${id}-FCE`, `GA-01${id}-OYM`][Number(id) - 1],
      pays: 'Gabon',
      type_plaque: ['Standard', 'Standard', 'Standard', 'Professionnel'][Number(id) - 1],
      carrosserie: ['Fermée', 'Fermée', 'Bâchée', 'Plateau'][Number(id) - 1]
    },
    carte_grise: {
      date_delivrance: [
        '15/06/2021',
        '23/03/2019',
        '12/09/2018',
        '05/11/2020'
      ][Number(id) - 1],
      lieu_delivrance: 'Libreville',
      type_proprietaire: isCompany ? 'Organisation' : 'Personne',
      image_scannee: '/documents/carte-grise.jpg',
      historique: isCompany ? [
        {
          date_delivrance: '10/05/2018',
          lieu_delivrance: 'Libreville',
          image_scannee: '/documents/carte-grise-precedente.jpg'
        }
      ] : undefined
    },
    historique_proprietaires: isCompany ? [
      {
        id: 'hp1',
        date_debut: '05/11/2020',
        date_fin: undefined,
        type_proprietaire: 'Organisation',
        nom_organisation: 'SODEXAF',
        numero_plaque: 'GA-012-OYM',
        est_actuel: true
      },
      {
        id: 'hp2',
        date_debut: '10/05/2018',
        date_fin: '05/11/2020',
        type_proprietaire: 'Personne',
        nom: 'Obiang',
        prenom: 'Marie',
        numero_plaque: 'GA-987-LBV',
        est_actuel: false
      }
    ] : [
      {
        id: 'hp3',
        date_debut: ['15/06/2021', '23/03/2019', '12/09/2018', ''][Number(id) - 1],
        date_fin: undefined,
        type_proprietaire: 'Personne',
        nom: ['Ndong Mba', 'Ondo', 'Moussavou', ''][Number(id) - 1],
        prenom: ['Jean', 'Sophie', 'Pierre', ''][Number(id) - 1],
        numero_plaque: [`GA-${id}23-LBV`, `GA-45${id}-POG`, `GA-78${id}-FCE`, `GA-01${id}-OYM`][Number(id) - 1],
        est_actuel: true
      }
    ],
    affectations: isCompany ? [
      {
        id: 'aff1',
        conducteur_nom: 'Mba',
        conducteur_prenom: 'Hervé',
        date_debut: '15/01/2023',
        date_fin: undefined,
        observations: 'Conducteur principal',
        est_actuel: true
      },
      {
        id: 'aff2',
        conducteur_nom: 'Koumba',
        conducteur_prenom: 'Marc',
        date_debut: '10/12/2021',
        date_fin: '14/01/2023',
        observations: 'Remplacé suite à mutation',
        est_actuel: false
      }
    ] : [],
    documents_administratifs: [
      {
        id: 'doc1',
        type_document: 'carte_grise',
        date_modification: ['15/06/2021', '23/03/2019', '12/09/2018', '05/11/2020'][Number(id) - 1],
        img_avant: '/documents/carte-grise-avant.jpg',
        img_apres: '/documents/carte-grise-apres.jpg',
        description: 'Carte grise originale'
      },
      {
        id: 'doc2',
        type_document: 'autre',
        date_modification: ['20/06/2021', '28/03/2019', '15/09/2018', '10/11/2020'][Number(id) - 1],
        img_avant: '/documents/document-suppl.jpg',
        description: 'Attestation de dédouanement'
      }
    ],
    pieces_identite: !isCompany ? {
      type_piece: 'CNI',
      numero: ['1234567', '7654321', '9876543', ''][Number(id) - 1],
      date_delivrance: ['10/03/2018', '15/07/2017', '22/01/2019', ''][Number(id) - 1],
      date_expiration: ['10/03/2028', '15/07/2027', '22/01/2029', ''][Number(id) - 1],
      images: ['/documents/cni-recto.jpg', '/documents/cni-verso.jpg']
    } : undefined,
    assurances: [
      {
        id: 'ass1',
        compagnie: ['NSIA Assurance', 'AXA Gabon', 'OGAR Assurances', 'UAG Assurances'][Number(id) - 1],
        numero_police: [`NS-${id}2345678`, `AX-876${id}4321`, `OG-${id}4681357`, `UA-${id}3572468`][Number(id) - 1],
        date_debut: ['01/01/2023', '15/04/2023', '10/01/2022', '30/09/2023'][Number(id) - 1],
        date_fin: ['31/12/2025', '15/04/2025', '10/01/2023', '30/09/2025'][Number(id) - 1],
        est_expire: id === '3'
      }
    ],
    visites_techniques: [
      {
        id: 'vt1',
        date: ['15/10/2023', '03/06/2023', '22/02/2022', '18/11/2023'][Number(id) - 1],
        validite_mois: 24,
        date_expiration: ['15/10/2025', '03/06/2025', '22/02/2023', '18/11/2025'][Number(id) - 1],
        resultat: ['conforme', 'conforme', 'conforme_avec_reserves', 'conforme'][Number(id) - 1] as any,
        est_expire: id === '3'
      },
      ...(id === '1' ? [{
        id: 'vt2',
        date: '10/10/2021',
        validite_mois: 24,
        date_expiration: '10/10/2023',
        resultat: 'conforme' as any,
        est_expire: true
      }] : [])
    ],
    controles_routiers: id === '3' ? [
      {
        id: 'cr1',
        date: '15/03/2023',
        lieu: 'Carrefour IAI, Libreville',
        agent: 'Officier Eyene',
        type_controle: 'Routine',
        resultat: 'Non-conformité',
        documents_scannes: ['/documents/rapport-controle.jpg'],
        amendes: [
          {
            id: 'am1',
            montant: 25000,
            motif: 'Défaut de visite technique',
            date_paiement: undefined,
            est_payee: false
          }
        ]
      },
      {
        id: 'cr2',
        date: '22/05/2023',
        lieu: 'Rond-point de la Démocratie',
        agent: 'Sergent Ntoutoume',
        type_controle: 'Barrage',
        resultat: 'Non-conformité',
        documents_scannes: ['/documents/rapport-controle-2.jpg'],
        amendes: [
          {
            id: 'am2',
            montant: 35000,
            motif: 'Défaut d\'assurance',
            date_paiement: undefined,
            est_payee: false
          }
        ]
      }
    ] : []
  };
};

const VehicleDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { TokenExpirationDialog } = useAuthToken();

  // Utilisation du hook pour récupérer les données du véhicule
  const { données: vehicle, chargement, erreur } = useApiData<VehicleDetailData>(
    `/api/vehicules/full/${params.id}`,
    {},
    () => generateMockVehicleData(params.id || '1')
  );

  if (chargement) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-transport-blue"></div>
      </div>
    );
  }

  if (erreur || !vehicle) {
    return (
      <div className="max-w-xl mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Véhicule introuvable</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Button>
            <div>{erreur || "Le véhicule n'existe pas dans la base."}</div>
          </CardContent>
        </Card>
      </div>
    );
  }
  console.log(vehicle);

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (isExpired: boolean, isSoonExpiring?: boolean) => {
    if (isExpired) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Expiré
        </Badge>
      );
    } else if (isSoonExpiring) {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="h-3.5 w-3.5 mr-1" /> Bientôt expiré
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3.5 w-3.5 mr-1" /> Valide
        </Badge>
      );
    }
  };

  // Fonction pour obtenir le badge de résultat de visite technique
  const getTechnicalVisitResultBadge = (result: string) => {
    switch (result) {
      case 'conforme':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Conforme
          </Badge>
        );
      case 'non_conforme':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3.5 w-3.5 mr-1" /> Non conforme
          </Badge>
        );
      case 'conforme_avec_reserves':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Conforme avec réserves
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            Non déterminé
          </Badge>
        );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Format date in DD/MM/YYYY format
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return dateString;
  };

  const openImageModal = (imageUrl: string) => {
    setActiveImage(imageUrl);
  };

  const closeImageModal = () => {
    setActiveImage(null);
  };

  const ownerType = vehicle.proprietaire_actuel.type;

  return (
    <div className="max-w-full mx-auto pb-12 print:pb-0">
      <TokenExpirationDialog />

      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <Car className="h-7 w-7 mr-2 text-transport-blue inline" />
            Détails du véhicule {vehicle.immatriculation.numero}
          </h1>
          <p className="text-gray-600">
            {vehicle.marque} {vehicle.type} - {vehicle.genre}
          </p>
        </div>

        <div className="flex gap-2 print:hidden">
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Exporter PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne de gauche */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Info className="h-5 w-5 mr-2 text-transport-blue" />
                Informations de base du véhicule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Numéro de série</p>
                  <p>{vehicle.num_serie}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Marque</p>
                  <p>{vehicle.marque}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p>{vehicle.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Genre</p>
                  <p>{vehicle.genre}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date 1ère mise en service</p>
                  <p>{formatDate(vehicle.date_premiere_mise_en_service)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Puissance administrative</p>
                  <p>{vehicle.puissance_administrative} CV</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Source d'énergie</p>
                  <p>{vehicle.source_energie}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Poids à vide</p>
                  <p>{vehicle.poids_vide} kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Charge utile</p>
                  <p>{vehicle.charge_utile} kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Poids total autorisé</p>
                  <p>{vehicle.poids_total_autorise} kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <p>{vehicle.est_neuf ? "Véhicule neuf" : "Véhicule d'occasion"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Carrosserie</p>
                  <p>{vehicle.immatriculation.carrosserie}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="owner" className="mb-6">
            <TabsList className="mb-4 w-full md:w-auto grid grid-cols-3 md:inline-flex">
              <TabsTrigger value="owner" className="text-xs md:text-sm">
                <User className="h-4 w-4 mr-1" /> Propriétaire
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs md:text-sm">
                <History className="h-4 w-4 mr-1" /> Historique
              </TabsTrigger>
              <TabsTrigger value="assignments" className="text-xs md:text-sm">
                <Building className="h-4 w-4 mr-1" /> Affectations
              </TabsTrigger>
            </TabsList>

            {/* Onglet Propriétaire */}
            <TabsContent value="owner" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    {ownerType === 'Personne' ? (
                      <User className="h-5 w-5 mr-2 text-transport-blue" />
                    ) : (
                      <Building className="h-5 w-5 mr-2 text-transport-blue" />
                    )}
                    Propriétaire actuel ({ownerType})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ownerType === 'Personne' ? (
                      <>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Nom</p>
                          <p>{vehicle.proprietaire_actuel.nom}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Prénom</p>
                          <p>{vehicle.proprietaire_actuel.prenom}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Sexe</p>
                          <p>{vehicle.proprietaire_actuel.sexe === 'M' ? 'Masculin' : 'Féminin'}</p>
                        </div>
                        {vehicle.pieces_identite && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Pièce d'identité</p>
                            <p>{vehicle.pieces_identite.type_piece} N° {vehicle.pieces_identite.numero}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-500">Nom de l'organisation</p>
                        <p>{vehicle.proprietaire_actuel.nom_organisation}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500">Téléphone</p>
                      <p>{vehicle.proprietaire_actuel.telephone}</p>
                    </div>
                    {vehicle.proprietaire_actuel.email && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p>{vehicle.proprietaire_actuel.email}</p>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-500">Adresse</p>
                      <p>{vehicle.proprietaire_actuel.adresse}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Carte grise */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-transport-blue" />
                    Carte Grise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Immatriculation</p>
                      <p className="text-lg font-semibold">{vehicle.immatriculation.numero}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date de délivrance</p>
                      <p>{formatDate(vehicle.carte_grise.date_delivrance)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lieu de délivrance</p>
                      <p>{vehicle.carte_grise.lieu_delivrance}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pays</p>
                      <p>{vehicle.immatriculation.pays}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type de plaque</p>
                      <p>{vehicle.immatriculation.type_plaque}</p>
                    </div>
                  </div>

                  {/* Image de la carte grise */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Image scannée</p>
                    <div
                      className="cursor-pointer border rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(vehicle.carte_grise.image_scannee)}
                    >
                      <img
                        src={vehicle.carte_grise.image_scannee}
                        alt="Carte grise"
                        className="w-full h-auto max-h-48 object-contain bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Historique des cartes grises */}
                  {vehicle.carte_grise.historique && vehicle.carte_grise.historique.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-2">Historique des cartes grises</h4>
                      <div className="space-y-4">
                        {vehicle.carte_grise.historique.map((cg, index) => (
                          <div key={index} className="border p-3 rounded-md">
                            <p className="text-sm">
                              <span className="font-medium">Date: </span>
                              {formatDate(cg.date_delivrance)}
                            </p>
                            <p className="text-sm mb-2">
                              <span className="font-medium">Lieu: </span>
                              {cg.lieu_delivrance}
                            </p>
                            <div
                              className="cursor-pointer border rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                              onClick={() => openImageModal(cg.image_scannee)}
                            >
                              <img
                                src={cg.image_scannee}
                                alt="Ancienne carte grise"
                                className="w-full h-auto max-h-32 object-contain bg-gray-100"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pièces d'identité du propriétaire */}
              {ownerType === 'Personne' && vehicle.pieces_identite && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-transport-blue" />
                      Pièce d'identité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type de pièce</p>
                        <p>{vehicle.pieces_identite.type_piece}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Numéro</p>
                        <p>{vehicle.pieces_identite.numero}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date de délivrance</p>
                        <p>{formatDate(vehicle.pieces_identite.date_delivrance)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date d'expiration</p>
                        <p>{formatDate(vehicle.pieces_identite.date_expiration)}</p>
                      </div>
                    </div>

                    {/* Images scannées */}
                    {vehicle.pieces_identite.images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Images scannées</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {vehicle.pieces_identite.images.map((img, index) => (
                            <div
                              key={index}
                              className="cursor-pointer border rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                              onClick={() => openImageModal(img)}
                            >
                              <img
                                src={img}
                                alt={`Pièce d'identité ${index + 1}`}
                                className="w-full h-auto max-h-48 object-contain bg-gray-100"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Onglet Historique */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <History className="h-5 w-5 mr-2 text-transport-blue" />
                    Historique des propriétaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {vehicle.historique_proprietaires.length > 0 ? (
                    <div className="space-y-6">
                      {vehicle.historique_proprietaires.map((record, index) => (
                        <div
                          key={record.id}
                          className={`relative flex gap-4 pb-6 ${index !== vehicle.historique_proprietaires.length - 1
                            ? "border-l-2 border-dashed border-gray-200 pl-6"
                            : "pl-6"
                            }`}
                        >
                          {/* Circle marker */}
                          <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-transport-blue"></div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {record.type_proprietaire === 'Personne' ? (
                                <User className="h-4 w-4 text-transport-blue" />
                              ) : (
                                <Building className="h-4 w-4 text-transport-blue" />
                              )}
                              <span className="font-medium">
                                {record.type_proprietaire === 'Personne'
                                  ? `${record.nom} ${record.prenom}`
                                  : record.nom_organisation}
                                {record.est_actuel && (
                                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                    Actuel
                                  </span>
                                )}
                              </span>
                            </div>

                            <div className="text-sm text-gray-600 mb-1">
                              Immatriculation: {record.numero_plaque}
                            </div>

                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>
                                {formatDate(record.date_debut)}
                                {record.date_fin && (
                                  <>
                                    <ArrowRight className="inline h-3 w-3 mx-1" />
                                    {formatDate(record.date_fin)}
                                  </>
                                )}
                                {!record.date_fin && " - présent"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aucun historique disponible.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Affectations */}
            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Building className="h-5 w-5 mr-2 text-transport-blue" />
                    Affectations aux conducteurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {vehicle.affectations && vehicle.affectations.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Prénom</TableHead>
                          <TableHead>Période</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Observations</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehicle.affectations.map((assignment) => (
                          <TableRow key={assignment.id}>
                            <TableCell className="font-medium">{assignment.conducteur_nom}</TableCell>
                            <TableCell>{assignment.conducteur_prenom}</TableCell>
                            <TableCell>
                              {formatDate(assignment.date_debut)}
                              {assignment.date_fin ? (
                                <> → {formatDate(assignment.date_fin)}</>
                              ) : (
                                " → présent"
                              )}
                            </TableCell>
                            <TableCell>
                              {assignment.est_actuel ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  Actuel
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                                  Terminé
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{assignment.observations || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-muted-foreground">Aucune affectation enregistrée pour ce véhicule.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Documents administratifs */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-transport-blue" />
                Documents administratifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.documents_administratifs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicle.documents_administratifs.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {doc.type_document === 'carte_grise' ? 'Carte grise' :
                              doc.type_document === 'permis' ? 'Permis' : 'Autre document'}
                          </Badge>
                          <p className="text-sm text-gray-600">
                            {doc.description && <span>{doc.description}</span>}
                          </p>
                          <p className="text-xs text-gray-500">
                            Modifié le {formatDate(doc.date_modification)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {doc.img_avant && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Recto</p>
                            <div
                              className="cursor-pointer border rounded overflow-hidden hover:opacity-90 transition-opacity"
                              onClick={() => openImageModal(doc.img_avant!)}
                            >
                              <img
                                src={doc.img_avant}
                                alt="Document recto"
                                className="w-full h-24 object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {doc.img_apres && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Verso</p>
                            <div
                              className="cursor-pointer border rounded overflow-hidden hover:opacity-90 transition-opacity"
                              onClick={() => openImageModal(doc.img_apres!)}
                            >
                              <img
                                src={doc.img_apres}
                                alt="Document verso"
                                className="w-full h-24 object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Aucun document administratif enregistré.</p>
              )}
            </CardContent>
          </Card>

          {/* Contrôles routiers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <ShieldCheck className="h-5 w-5 mr-2 text-transport-blue" />
                Contrôles routiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.controles_routiers.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {vehicle.controles_routiers.map((controle, index) => (
                    <AccordionItem key={controle.id} value={`item-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start">
                          <div className="flex items-center">
                            <CalendarClock className="h-4 w-4 mr-2 text-transport-blue" />
                            <span>{formatDate(controle.date)}</span>
                            {controle.amendes.some(a => !a.est_payee) && (
                              <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
                                Amendes impayées
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500 mt-1">{controle.lieu}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Agent</p>
                              <p>{controle.agent}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Type de contrôle</p>
                              <p>{controle.type_controle}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-500">Résultat</p>
                              <p>{controle.resultat}</p>
                            </div>
                          </div>

                          {/* Amendes associées */}
                          {controle.amendes.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-semibold mb-2">Amendes associées</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Motif</TableHead>
                                    <TableHead>Montant</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Date paiement</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {controle.amendes.map((amende) => (
                                    <TableRow key={amende.id}>
                                      <TableCell>{amende.motif}</TableCell>
                                      <TableCell>{amende.montant.toLocaleString()} FCFA</TableCell>
                                      <TableCell>
                                        {amende.est_payee ? (
                                          <Badge variant="outline" className="bg-green-100 text-green-800">
                                            Payée
                                          </Badge>
                                        ) : (
                                          <Badge variant="outline" className="bg-red-100 text-red-800">
                                            Impayée
                                          </Badge>
                                        )}
                                      </TableCell>
                                      <TableCell>{amende.date_paiement || "-"}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}

                          {/* Documents scannés */}
                          {controle.documents_scannes.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-semibold mb-2">Documents du contrôle</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {controle.documents_scannes.map((doc, idx) => (
                                  <div
                                    key={idx}
                                    className="cursor-pointer border rounded overflow-hidden hover:opacity-90 transition-opacity"
                                    onClick={() => openImageModal(doc)}
                                  >
                                    <img
                                      src={doc}
                                      alt={`Document ${idx + 1}`}
                                      className="w-full h-24 object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-muted-foreground">Aucun contrôle routier enregistré pour ce véhicule.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Colonne de droite (statut documents) */}
        <div className="lg:col-span-1 space-y-6">
          {/* État immatriculation */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-transport-blue" />
                Immatriculation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-2xl font-bold text-center">{vehicle.immatriculation.numero}</h3>
                <p className="text-center text-sm text-gray-500">{vehicle.immatriculation.pays}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type de plaque:</span>
                  <span className="font-medium">{vehicle.immatriculation.type_plaque}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Date d'immatriculation:</span>
                  <span className="font-medium">{formatDate(vehicle.carte_grise.date_delivrance)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visites techniques */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Wrench className="h-5 w-5 mr-2 text-transport-blue" />
                Visites techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.visites_techniques.length > 0 ? (
                <>
                  <div className="mb-2">
                    {getStatusBadge(vehicle.visites_techniques[0].est_expire)}
                  </div>

                  <div className="space-y-4">
                    {vehicle.visites_techniques.map((vt, index) => (
                      <div key={vt.id} className={`p-3 rounded-md ${index === 0
                        ? vt.est_expire ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'
                        : 'border'
                        }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{formatDate(vt.date)}</p>
                            <p className="text-xs text-gray-500">Validité: {vt.validite_mois} mois</p>
                          </div>
                          <div>
                            {getTechnicalVisitResultBadge(vt.resultat)}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">Expiration: </span>
                          <span className={`font-medium ${vt.est_expire ? 'text-red-600' : ''}`}>
                            {formatDate(vt.date_expiration)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Aucune visite technique enregistrée.</p>
              )}
            </CardContent>
          </Card>

          {/* Assurances */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-transport-blue" />
                Assurances
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.assurances.length > 0 ? (
                <>
                  <div className="mb-2">
                    {getStatusBadge(vehicle.assurances[0].est_expire)}
                  </div>

                  <div className="space-y-4">
                    {vehicle.assurances.map((assurance, index) => (
                      <div key={assurance.id} className={`p-3 rounded-md ${index === 0
                        ? assurance.est_expire ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'
                        : 'border'
                        }`}>
                        <p className="font-medium">{assurance.compagnie}</p>
                        <p className="text-sm text-gray-600">Police N° {assurance.numero_police}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Période: {formatDate(assurance.date_debut)} → {formatDate(assurance.date_fin)}
                        </p>
                        {assurance.est_expire && (
                          <p className="text-sm text-red-600 mt-1 font-medium">
                            Assurance expirée
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Aucune assurance enregistrée.</p>
              )}
            </CardContent>
          </Card>

          {/* Récapitulatif des amendes */}
          {vehicle.controles_routiers.length > 0 &&
            vehicle.controles_routiers.some(c => c.amendes.length > 0) && (
              <Card className="bg-red-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                    Amendes impayées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const amendesImpayees = vehicle.controles_routiers
                      .flatMap(c => c.amendes.filter(a => !a.est_payee));

                    const montantTotal = amendesImpayees.reduce((sum, a) => sum + a.montant, 0);

                    return (
                      <div>
                        <div className="font-bold text-red-700 text-xl mb-2">
                          {montantTotal.toLocaleString()} FCFA
                        </div>
                        <p className="text-sm text-red-600">
                          {amendesImpayees.length} {amendesImpayees.length > 1 ? "amendes impayées" : "amende impayée"}
                        </p>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
        </div>
      </div>

      {/* Modal pour afficher les images en grand */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="font-medium">Image du document</h3>
              <button
                onClick={closeImageModal}
                className="rounded-full hover:bg-gray-200 p-2"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center">
              <img
                src={activeImage}
                alt="Document en plein écran"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetail;
