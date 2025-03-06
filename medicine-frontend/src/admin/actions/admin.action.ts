import axios from "axios";

export const authenticateAdministrator = async (adminEmail: string, pwdAdmin) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.post(`${API_URL}/api/login_token`, {
            email: adminEmail,
            password: pwdAdmin
        });
        
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        throw new Error("Impossible d'authentifier le médecin");
    }
}