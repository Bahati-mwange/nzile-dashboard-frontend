
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Save,
    User,
    Mail,
    Phone,
    Map,
    Lock,
    UserMinus,
    Check
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Type pour les données utilisateur
type Utilisateur = {
    id: string;
    nom: string;
    prénom: string;
    email: string;
    téléphone: string;
    role: 'admin' | 'agent' | 'superviseur';
    province: string;
    statut: 'actif' | 'inactif';
};

// Schéma de validation du formulaire
const formSchema = z.object({
    nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    prénom: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Email invalide" }),
    téléphone: z.string().min(9, { message: "Le numéro de téléphone est trop court" }),
    role: z.enum(["admin", "agent", "superviseur"]),
    province: z.string().min(1, { message: "Veuillez sélectionner une province" }),
    statut: z.enum(["actif", "inactif"]),
});

// Simuler des données utilisateur
const générerDonnéesUtilisateur = (id: string): Utilisateur => ({
    id,
    nom: id === "A001" ? "Nzoghe" : id === "A002" ? "Mboumba" : "Utilisateur",
    prénom: id === "A001" ? "Jean-Paul" : id === "A002" ? "Claire" : "Prénom",
    email: id === "A001" ? "jp.nzoghe@transport.gouv.ga" : id === "A002" ? "c.mboumba@transport.gouv.ga" : "user@transport.gouv.ga",
    téléphone: id === "A001" ? "+241 77123456" : id === "A002" ? "+241 66789012" : "+241 65432198",
    role: id === "A001" ? "superviseur" : "agent",
    province: id === "A001" ? "Estuaire" : id === "A002" ? "Ogooué-Maritime" : "Woleu-Ntem",
    statut: id === "A003" ? "inactif" : "actif"
});

const provinces = [
    "Estuaire",
    "Haut-Ogooué",
    "Moyen-Ogooué",
    "Ngounié",
    "Nyanga",
    "Ogooué-Ivindo",
    "Ogooué-Lolo",
    "Ogooué-Maritime",
    "Woleu-Ntem"
];

const UserEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { données: utilisateur, chargement } = useApiData<Utilisateur>(
        `https://votre-api.com/users/${id}`,
        undefined,
        () => générerDonnéesUtilisateur(id || 'A001')
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            prénom: "",
            email: "",
            téléphone: "",
            role: "agent",
            province: "",
            statut: "actif"
        }
    });

    // Mettre à jour les valeurs par défaut lorsque les données sont chargées
    React.useEffect(() => {
        if (utilisateur) {
            form.reset({
                nom: utilisateur.nom,
                prénom: utilisateur.prénom,
                email: utilisateur.email,
                téléphone: utilisateur.téléphone,
                role: utilisateur.role,
                province: utilisateur.province,
                statut: utilisateur.statut
            });
        }
    }, [utilisateur, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        toast({
            title: "Utilisateur modifié",
            description: `Les informations de ${values.prénom} ${values.nom} ont été mises à jour.`,
        });
        setTimeout(() => navigate(`/users/${id}`), 1500);
    };

    const handleResetPassword = () => {
        toast({
            title: "Mot de passe réinitialisé",
            description: "Un nouveau mot de passe a été envoyé par email à l'utilisateur.",
        });
    };

    const handleDeleteUser = () => {
        toast({
            title: "Utilisateur supprimé",
            description: "L'utilisateur a été supprimé avec succès.",
            variant: "destructive"
        });
        setTimeout(() => navigate('/users'), 1500);
    };

    return (
        <div className="space-y-6 pb-10">
            {/* En-tête et actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/users/${id}`)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Modifier Utilisateur</h1>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <UserMinus className="mr-1 h-4 w-4" />
                            Supprimer
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action est irréversible. Toutes les données associées à cet utilisateur seront également supprimées.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
                                Supprimer
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {chargement ? (
                <div className="flex items-center justify-center h-64">
                    <p>Chargement des données utilisateur...</p>
                </div>
            ) : utilisateur ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Informations personnelles
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="nom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nom" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="prénom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prénom</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Prénom" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                                        <Input className="pl-9" placeholder="email@exemple.com" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="téléphone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Téléphone</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                                        <Input className="pl-9" placeholder="+241 xxxxxxxx" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleResetPassword}
                                    >
                                        <Lock className="mr-1 h-4 w-4" />
                                        Réinitialiser le mot de passe
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Map className="h-5 w-5 text-green-600" />
                                    Affectation et rôle
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Rôle</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionner un rôle" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="agent">Agent</SelectItem>
                                                        <SelectItem value="superviseur">Superviseur</SelectItem>
                                                        <SelectItem value="admin">Administrateur</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="province"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Province</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionner une province" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {provinces.map((province) => (
                                                            <SelectItem key={province} value={province}>
                                                                {province}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="statut"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Statut</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionner un statut" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="actif">Actif</SelectItem>
                                                        <SelectItem value="inactif">Inactif</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(`/users/${id}`)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit">
                                <Save className="mr-1 h-4 w-4" />
                                Enregistrer les modifications
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-red-500">Utilisateur non trouvé</p>
                    <Button className="mt-4" onClick={() => navigate('/users')}>
                        Retour à la liste
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UserEdit;
