import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Medecin {
  numRpps: string;
  nom: string;
  prenom: string;
  specialite: string;
}

export function SelecteurMedecin({
  options,
  label,
  value,
  onChange,
}: {
  options: any;
  label: string;
  value?: string;
  onChange: any;
}) {
  const medecinGeneralisteList = options.filter((medecin: Medecin) => {
    return medecin.specialite.toLowerCase() == "medecin généraliste";
  });

  return (
    <div className="flex flex-col">
      <Select
        value={`/api/medecins/${value}`}
        onValueChange={onChange}
        name="medecin_perso"
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez votre médecin" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {medecinGeneralisteList.map((option: any) => (
              <SelectItem
                key={option.numRpps}
                value={`/api/medecins/${option.numRpps}`}
              >
                {`Dr. ${option.nom} ${option.prenom} - ${option.specialite}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
