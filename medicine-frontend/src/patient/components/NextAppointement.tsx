import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";


export const NextAppointement = ({ className, medecin, date, time }: {className: string, medecin: any, date: string, time: string}) => {

    if(medecin == undefined){
        return <Card className={className}>
            <CardTitle className="text-black flex justify-center m-3">
                Votre prochain rendez-vous
            </CardTitle>
            <hr />
            <CardContent className="flex flex-col items-center justify-center p-6">
                <h2 className="text-gray-600 text-lg font-medium">
                    Aucun rendez-vous prévu
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                    Prenez un rendez-vous dès maintenant.
                </p>
            </CardContent>
        </Card>
    }

    const monthNames = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    let dateTMP = new Date(date);
    let dateDay = dateTMP.getDate();
    let dateMonth = monthNames[dateTMP.getMonth()];
    let dateYear = dateTMP.getFullYear();
    let formattedTime = time.split(":").slice(0, 2).join("h")

    let formattedDate = `${dateDay} ${dateMonth} ${dateYear}`;

    return (
        <Card className={className}>
            <CardTitle className="text-black flex justify-center m-3">
                Votre prochain rendez-vous
            </CardTitle>
            <hr />
            <CardContent className="flex flex-col justify-center items-center p-4 h-full">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 w-full">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="https://github.com/shadcn.png"
                                     alt={`${medecin.prenom} ${medecin.nom}`}/>
                        <AvatarFallback>{medecin.nom}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col min-w-0 text-center sm:text-left">
                        <h1 className="text-lg font-semibold">{`Dr. ${medecin.nom} ${medecin.prenom}`}</h1>
                        <h2 className="text-muted-foreground text-sm sm:text-md">
                            {medecin?.specialite}
                        </h2>
                    </div>

                    <div className="flex flex-col items-end text-right">
                        <p className="text-primary font-semibold text-md sm:text-lg">
                            {formattedDate}
                        </p>
                        <p className="text-muted-foreground text-sm sm:text-md">
                            {formattedTime}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
