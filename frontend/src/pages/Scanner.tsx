
import React from 'react';
import { ScanLine, Search, CameraIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Scanner: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Scanner</h1>
        <p className="text-muted-foreground">
          Scannez une plaque d'immatriculation ou un document d'identité
        </p>
      </div>

      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan">Scanner</TabsTrigger>
          <TabsTrigger value="manual">Recherche manuelle</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="space-y-4">
          <Card className="bg-white">
            <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
              <CameraIcon className="h-24 w-24 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground mb-4">
                Cliquez sur "Scanner" pour prendre une photo d'une carte grise ou d'un permis
              </p>
              <Button className="bg-gabon-blue hover:bg-gabon-blue/90 w-48">
                <ScanLine className="mr-2 h-4 w-4" />
                Scanner
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-4">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="plateNumber" className="block text-sm font-medium mb-1">
                    Numéro d'immatriculation
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="plateNumber"
                      placeholder="Ex: GA-123-LBV ou P-GAB-2022-123456"
                      className="flex-1"
                    />
                    <Button>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  ou
                </div>
                
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium mb-1">
                    Numéro de permis
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="licenseNumber"
                      placeholder="Ex: P-GAB-2022-123456"
                      className="flex-1"
                    />
                    <Button>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <p>Aucun résultat récent</p>
            <p className="text-sm">Les résultats de vos scans apparaîtront ici</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scanner;
