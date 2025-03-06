import {postMedecin} from "@/admin/actions/admin.action.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useZodForm } from "./Form.tsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const medecinSchema = z.object({
    email: z.string().min(1, "L'email est requis"),
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    num_rpps: z.string().min(12, "Le numéro rpps est constitué de 12 chiffres").max(12, "Le numéro rpps est constitué de 12 chiffres"),
    num_tel: z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide"),
    specialite: z.string().min(1, "La spécialité est requise.")
});

export const AddMedecinForm = () => {
    const form = useZodForm({ schema: medecinSchema });
    const { toast } = useToast();
    const query = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: async (data) => {
            await postMedecin(data);
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["medecins"] });
            toast({
                title: "Succès",
                description: `Le médecin a été créé avec succès.`,
            });
        },
        onError: (error: any) => {
            console.error("Erreur lors de la mutation:", error);
            
            const errorMessage = error?.response?.data?.error ||
                error?.message ||
                "Une erreur est survenue.";
            
            toast({
                title: "Erreur",
                description: errorMessage,
                variant: "destructive",
            });
        },
    });


    
    const onSubmit = (data) => {
        console.log(data)
        mutation.mutate(data);
    };
    
    return (
        <Form form={form} onSubmit={onSubmit}>
            <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                            <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                            <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="num_rpps"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Numéro RPPS</FormLabel>
                        <FormControl>
                            <Input placeholder="123456789012" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="num_tel"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Numéro de téléphone</FormLabel>
                        <FormControl>
                            <Input placeholder="0601020304" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="specialite"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Spécialité</FormLabel>
                        <FormControl>
                            <Input placeholder="Cardiologque" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="mt-4">
                Ajouter le médecin
            </Button>
        </Form>
    );
};