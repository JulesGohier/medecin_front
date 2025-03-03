import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

export const NextAppointement = ({ className }: { className: string })=>{

    return (
        <Card className={className}>
            <CardTitle className="text-black flex justify-center m-3">
                Votre prochain rendez-vous
            </CardTitle>
            <hr />
            <CardContent className="flex flex-col justify-center items-center p-4 h-full">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 w-full">
                    {/* Avatar */}
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Jules Gohier" />
                        <AvatarFallback>JG</AvatarFallback>
                    </Avatar>

                    {/* Infos */}
                    <div className="flex flex-col min-w-0 text-center sm:text-left">
                        <h1 className="text-lg font-semibold">Dr. TIRBOIS</h1>
                        <h2 className="text-muted-foreground text-sm sm:text-md">
                            Médecin généraliste
                        </h2>
                    </div>

                    {/* Date & Heure */}
                    <div className="flex flex-col items-end text-right">
                        <p className="text-primary font-semibold text-md sm:text-lg">
                            12 Mars 2024
                        </p>
                        <p className="text-muted-foreground text-sm sm:text-md">14h30</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )


}