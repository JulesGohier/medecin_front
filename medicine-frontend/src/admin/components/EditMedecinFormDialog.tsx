import {useToast} from "@/hooks/use-toast.ts";
import { useState } from "react";
import { editMedecin } from "@/admin/actions/admin.action.ts";
import { medecinSchema } from "@/admin/components/AddMedecinForm.tsx";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
    useZodForm,
} from "@/admin/components/Form.tsx";
import { MedecinType } from "@/admin/components/MedecinTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
    DialogTrigger,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";

export const EditMedecinFormDialog = ({ data }: { data: MedecinType }) => {
    const [open, setOpen] = useState(false);
    const form = useZodForm({ schema: medecinSchema, defaultValues: data });
    const { toast } = useToast();
    
    const query = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: async (formData) => {
            await editMedecin(data.num_rpps, formData);
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["medecins"] });
            toast({
                title: "Succès",
                description: `Le médecin a été modifié avec succès.`,
            });
            // Fermer le dialog après succès
            setOpen(false);
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
    
    const onSubmit = (formData) => {
        console.log(formData);
        mutation.mutate(formData);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                    <Edit className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier le médecin</DialogTitle>
                </DialogHeader>
                <Form form={form} onSubmit={onSubmit}>
                    <FormField name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="nom" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="prenom" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="num_rpps" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro RPPS</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="num_tel" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro de téléphone</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="specialite" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Spécialité</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit" className="mt-4">
                        Enregistrer les modifications
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
