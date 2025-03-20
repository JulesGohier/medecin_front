import axios from "axios";
import {registerPatientType} from "@/templates/landingPage/actions/type.ts"

export const authenticate = async ({email, password}:{email: string, password: string}) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const response = await axios.post(`${API_URL}/api/login_token`, {
            email: email,
            password: password
        });

        const { token, roles } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", JSON.stringify(roles.toString()));

        if (roles == "ROLE_MEDECIN"){
            localStorage.setItem("id", response.data.id);
        }else if (roles == "ROLE_PATIENT"){
            localStorage.setItem("patient", JSON.stringify(response.data.patient));
        }

        return roles.toString();
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Vérifiez votre connexion et réessayez.");
        }
    }
};

export const registerPatient = async (informationInscription: registerPatientType) => {
    const API_URL = import.meta.env.VITE_API_URL;
    console.log(informationInscription);
    try {
        await axios.post(`${API_URL}/api/register/patient`, JSON.stringify({
            ...informationInscription,
            sexe: informationInscription.sexe.toLowerCase(),
        }));
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Vérifiez votre connexion et réessayez.");
        }
    }
};

export const fetchAllMedecins = async () => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const response = await axios.get(`${API_URL}/api/medecins`);

        return response.data.member;
    } catch (error) {
        throw new Error("Impossible de récupérer les médecins.");
    }
};