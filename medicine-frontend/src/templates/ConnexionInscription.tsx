import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthPage() {
  const [selectedTab, setSelectedTab] = useState("login"); // Gérer l'onglet actif

  return (
    <div className="w-full max-w-sm mx-auto">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
          <TabsTrigger value="password">Changer le mot de passe</TabsTrigger>
        </TabsList>

        {/* Formulaire de Connexion */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>Entrez vos informations pour vous connecter.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="login-username">Username</Label>
                <Input id="login-username" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Se connecter</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Formulaire d'Inscription */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>Créez un compte pour commencer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="register-username">Username</Label>
                <Input id="register-username" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>S'inscrire</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Formulaire de changement de mot de passe */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
              <CardDescription>Modifiez votre mot de passe actuel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Changer le mot de passe</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
