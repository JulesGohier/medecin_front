export  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(
        /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        '$1 $2 $3 $4 $5'
    );
};


export const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
    
    return formattedDate;
}