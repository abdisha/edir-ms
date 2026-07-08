
// Import Button component from shadcn/ui
import { Button } from "@/shared/components/ui/button";
import {Plus} from "lucide-react";

const EdirPage =()=>{
    return(
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-2xl w-full">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Edir Management Information</h1>
                <p className="text-lg text-gray-600 mb-6">You haven't added any Edir yet.</p>
                <Button size="lg" variant="default" className="mt-4">

                    <Plus className="mr-2 h-5 w-5" />
                    Add your Edir
                </Button>
            </div>
        </div>
    )
}
export default EdirPage;