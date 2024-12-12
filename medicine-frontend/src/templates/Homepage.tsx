import {SidebarLayout} from "@/components/features/layout/SidebarLayout.tsx";
import {Button} from "@/components/ui/button.tsx";


const Homepage = () => {
    return (
        <SidebarLayout>
           <Button
               variant={"themed"}
           >
               Button
           </Button>
            Commit de test
        </SidebarLayout>
    );
};

export default Homepage;