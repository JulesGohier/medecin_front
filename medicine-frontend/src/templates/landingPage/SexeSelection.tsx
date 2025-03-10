import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SexeSelection({ handleInputChange }: {handleInputChange: any}) {
    return (
        <div className="w-full flex flex-col">
            <RadioGroup className="flex justify-evenly " onValueChange={handleInputChange}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="homme" id="sexe_homme"/>
                    <Label htmlFor="sexe_homme">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="femme" id="sexe_femme" />
                    <Label htmlFor="sexe_femme">Femme</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="autre" id="sexe_autre" />
                    <Label htmlFor="sexe_autre">Autre</Label>
                </div>
            </RadioGroup>
        </div>
    );
}
