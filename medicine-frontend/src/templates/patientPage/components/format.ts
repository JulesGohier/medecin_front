export  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(
        /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        '$1 $2 $3 $4 $5'
    );
};

type tailleDate = "short" | "long";


export const formatDate = (date: string, taille: tailleDate) => {
    const dateObj = new Date(date);
    let formattedDate;

    if(taille == "short"){
        formattedDate = dateObj.toLocaleString("fr-FR", {
            timeZone: "UTC",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }else{
        formattedDate = dateObj.toLocaleString("fr-FR", {
            timeZone: "UTC",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return formattedDate;
};

