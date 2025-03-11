import Footer from "./Footer";
import { Tabs } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { useState } from "react";
import { authenticate } from "@/templates/landingPage/actions/landing-action.ts";

export function Connexion() {
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const [errorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const response = await authenticate({
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      return response;
    },
    onSuccess: (role) => {
      if (role === "ROLE_MEDECIN") {
        window.location.href = "/dashboard_medecin";
      } else if (role === "ROLE_PATIENT") {
        window.location.href = "/dashboard_patient";
      } else if (role === "ROLE_ADMIN") {
        window.location.href = "/dashboard_admin";
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Connexion erreur`,
        description: `${error.message}`,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center flex-grow bg-gray-100 py-6">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-4">Connexion</h1>
          <Tabs>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="p-2 w-full border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="p-2 w-full border border-gray-300 rounded"
              />

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              <button
                type="submit"
                className="p-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Se connecter
              </button>
            </form>
          </Tabs>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
}
