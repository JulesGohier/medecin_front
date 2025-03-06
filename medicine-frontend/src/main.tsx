import {Toaster} from "@/components/ui/toaster.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Toaster/>
            <App />
          </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>,
)
