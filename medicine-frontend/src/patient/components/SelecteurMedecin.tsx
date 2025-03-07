import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelecteurMedecin({ options, label, value, onChange }: {
    options: any,
    label: string,
    value?: string,
    onChange: any
}) {
    console.log(options);
    return (
        <div className="flex flex-col">
            <Select value={value} onValueChange={onChange} name="medecin_perso">
                <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre médecin" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {options.map((option: any) => (
                            <SelectItem  key={option.numRpps} value={option.numRpps}>
                                {option.nom}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}