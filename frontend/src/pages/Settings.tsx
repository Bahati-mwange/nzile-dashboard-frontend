
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon, 
  User, 
  ShieldAlert, 
  Globe, 
  PaintBucket, 
  KeyRound, 
  Bell, 
  Save, 
  Trash2,
  Moon,
  SunMedium
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import DeleteConfirmation from '@/components/users/UserDeleteConfirmation';

const Settings: React.FC = () => {
  const toast = useToast(); // This returns the toast function directly
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "Jean Koumba",
    email: "jean.koumba@transport.gouv.ga",
    phone: "+241 77 12 34 56",
    role: "Administrateur",
    department: "Direction Générale des Transports",
    bio: "Responsable de la gestion des infractions routières",
    avatar: "/placeholder.svg"
  });

  // Settings state
  const [settings, setSettings] = useState({
    theme: "light",
    language: "fr",
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    autoSave: true,
    sessionTimeout: "30",
    dataRetention: "90",
    twoFactorAuth: false,
    highContrastMode: false
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été sauvegardées avec succès.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Compte supprimé",
      description: "Votre compte a été supprimé avec succès.",
      variant: "destructive",
    });
    setIsDeleteAccountDialogOpen(false);
  };

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    if (section === 'profile') {
      setUserProfile(prev => ({
        ...prev,
        [field]: value
      }));
    } else if (section === 'settings') {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez votre profil et vos préférences système
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Compte</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <PaintBucket className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-6">
          {/* Profil */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      value={userProfile.name} 
                      onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userProfile.email} 
                      onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      value={userProfile.phone} 
                      onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      rows={4}
                      value={userProfile.bio} 
                      onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations professionnelles</CardTitle>
                  <CardDescription>
                    Détails de votre rôle et département
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="role" 
                        value={userProfile.role} 
                        readOnly
                        className="bg-gray-50"
                      />
                      <Badge className="bg-gabon-blue">Actif</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Département</Label>
                    <Select 
                      value={userProfile.department}
                      onValueChange={(value) => handleInputChange('profile', 'department', value)}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Sélectionner un département" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direction Générale des Transports">Direction Générale des Transports</SelectItem>
                        <SelectItem value="Service des Permis de Conduire">Service des Permis de Conduire</SelectItem>
                        <SelectItem value="Service des Immatriculations">Service des Immatriculations</SelectItem>
                        <SelectItem value="Service de Contrôle Routier">Service de Contrôle Routier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-4">Autorisations</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">Administrateur</Badge>
                        <Badge className="bg-blue-500">Gestion des utilisateurs</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-500">Gestion des infractions</Badge>
                        <Badge className="bg-orange-500">Rapports</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Dernière connexion</h4>
                    <p className="text-sm text-muted-foreground">10/04/2025 à 08:45</p>
                    <p className="text-sm text-muted-foreground">IP: 197.215.23.45</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compte */}
          <TabsContent value="account">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du compte</CardTitle>
                  <CardDescription>
                    Gérez les options de sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Authentification à deux facteurs</label>
                      <p className="text-xs text-muted-foreground">
                        Ajoute une couche de sécurité supplémentaire à votre compte
                      </p>
                    </div>
                    <Switch 
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleInputChange('settings', 'twoFactorAuth', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Expiration de session</label>
                      <p className="text-xs text-muted-foreground">
                        Temps avant déconnexion automatique
                      </p>
                    </div>
                    <Select 
                      value={settings.sessionTimeout}
                      onValueChange={(value) => handleInputChange('settings', 'sessionTimeout', value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Délai d'expiration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 heure</SelectItem>
                        <SelectItem value="120">2 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleSaveSettings}>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Mettre à jour
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gestion du compte</CardTitle>
                  <CardDescription>
                    Options avancées pour votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Conservation des données</Label>
                    <Select 
                      value={settings.dataRetention}
                      onValueChange={(value) => handleInputChange('settings', 'dataRetention', value)}
                    >
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Durée de conservation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="90">90 jours</SelectItem>
                        <SelectItem value="180">6 mois</SelectItem>
                        <SelectItem value="365">1 an</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Durée pendant laquelle vos données d'activité sont conservées
                    </p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Téléchargement des données</h4>
                    <p className="text-xs text-muted-foreground">
                      Vous pouvez télécharger une copie de vos données personnelles
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        Télécharger mes données
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-red-600">Zone de danger</h4>
                    <p className="text-xs text-muted-foreground">
                      Les actions ci-dessous sont irréversibles. Procédez avec prudence.
                    </p>
                    <Button 
                      variant="destructive"
                      onClick={() => setIsDeleteAccountDialogOpen(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer mon compte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Apparence */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Apparence et affichage</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Thème</h4>
                  <RadioGroup 
                    value={settings.theme}
                    onValueChange={(value) => handleInputChange('settings', 'theme', value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem 
                        value="light" 
                        id="theme-light" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-gabon-blue [&:has([data-state=checked])]:border-gabon-blue"
                      >
                        <SunMedium className="h-6 w-6 mb-3" />
                        Mode clair
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem 
                        value="dark" 
                        id="theme-dark" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-950 text-white p-4 hover:bg-gray-900 hover:border-gray-800 peer-data-[state=checked]:border-gabon-blue [&:has([data-state=checked])]:border-gabon-blue"
                      >
                        <Moon className="h-6 w-6 mb-3" />
                        Mode sombre
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Langue</h4>
                  <Select 
                    value={settings.language}
                    onValueChange={(value) => handleInputChange('settings', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Accessibilité</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Mode contraste élevé</label>
                      <p className="text-xs text-muted-foreground">
                        Améliore la visibilité des éléments de l'interface
                      </p>
                    </div>
                    <Switch 
                      checked={settings.highContrastMode}
                      onCheckedChange={(checked) => handleInputChange('settings', 'highContrastMode', checked)}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Comportement</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Sauvegarde automatique</label>
                      <p className="text-xs text-muted-foreground">
                        Sauvegarde automatiquement les modifications
                      </p>
                    </div>
                    <Switch 
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => handleInputChange('settings', 'autoSave', checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les préférences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Configurez comment et quand vous souhaitez être notifié
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Notifications dans l'application</label>
                    <p className="text-xs text-muted-foreground">
                      Recevoir des notifications dans l'application
                    </p>
                  </div>
                  <Switch 
                    checked={settings.notifications}
                    onCheckedChange={(checked) => handleInputChange('settings', 'notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Notifications par email</label>
                    <p className="text-xs text-muted-foreground">
                      Recevoir des notifications par email
                    </p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('settings', 'emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Notifications par SMS</label>
                    <p className="text-xs text-muted-foreground">
                      Recevoir des notifications par SMS
                    </p>
                  </div>
                  <Switch 
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange('settings', 'smsNotifications', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Types de notification</h4>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4">
                      <Label className="text-sm">Type d'événement</Label>
                      <Label className="text-sm text-center">Email</Label>
                      <Label className="text-sm text-center">Application</Label>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm">Nouvelles infractions</span>
                      <div className="flex justify-center">
                        <Switch checked={true} />
                      </div>
                      <div className="flex justify-center">
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm">Rapports générés</span>
                      <div className="flex justify-center">
                        <Switch checked={true} />
                      </div>
                      <div className="flex justify-center">
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm">Alertes système</span>
                      <div className="flex justify-center">
                        <Switch checked={true} />
                      </div>
                      <div className="flex justify-center">
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm">Mises à jour</span>
                      <div className="flex justify-center">
                        <Switch checked={true} />
                      </div>
                      <div className="flex justify-center">
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveSettings}>
                  <Bell className="mr-2 h-4 w-4" />
                  Mettre à jour les préférences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <DeleteConfirmation
        isOpen={isDeleteAccountDialogOpen}
        onOpenChange={setIsDeleteAccountDialogOpen}
        onConfirm={handleDeleteAccount}
        title="Supprimer votre compte ?"
        description="Cette action est irréversible et supprimera définitivement votre compte et toutes vos données personnelles."
        cancelText="Annuler"
        confirmText="Supprimer mon compte"
      />
    </div>
  );
};

export default Settings;
