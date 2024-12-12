import {SidebarLayout} from "@/components/features/layout/SidebarLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from 'react';


const Homepage = () => {
    return (
        <SidebarLayout>
           <Button
               variant={"themed"}
           >
               Test
           </Button>
        </SidebarLayout>
    );
};

export default Homepage;