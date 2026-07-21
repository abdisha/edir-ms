import './App.css'
import {RouterProvider} from "react-router";
import {router} from "@/router.tsx";
import {Toaster} from "@/shared/components/ui/sonner.tsx";

function App() {
     return <>
          <RouterProvider router={router}/>
          <Toaster richColors position={"top-right"}/>
     </>

}

export default App
