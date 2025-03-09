import {EditMedecinFormDialog} from "@/admin/components/EditMedecinFormDialog.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type MedecinType = {
    email: string
    nom: string
    prenom: string
    num_rpps: string
    num_tel: string
    specialite: string
}

export default function MedecinTable({ medecins }: { medecins: MedecinType[] }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Médecins</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Numéro RPPS</TableHead>
                        <TableHead>Numéro de téléphone</TableHead>
                        <TableHead>Specialité</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medecins?.member.map((medecin, index) => (
                        <TableRow key={index}>
                            <TableCell>{medecin.email}</TableCell>
                            <TableCell>{medecin.nom}</TableCell>
                            <TableCell>{medecin.prenom}</TableCell>
                            <TableCell>{medecin.num_rpps}</TableCell>
                            <TableCell>{medecin.num_tel}</TableCell>
                            <TableCell>{medecin.specialite}</TableCell>
                            <TableCell>
                                <EditMedecinFormDialog data={medecin} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

