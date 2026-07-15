import './App.css'
import {RouterProvider} from "react-router";
import {router} from "@/router.tsx";
import {Toaster} from "@/shared/components/ui/sonner.tsx";

import {queryClient} from "@/shared/api/QueryClient.ts";
import {QueryClientProvider} from "@tanstack/react-query";

function App() {
     return <>
          <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
          <Toaster richColors position={"top-right"}/>
          </QueryClientProvider>
     </>

}

export default App
