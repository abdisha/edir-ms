import SettingPage from "./pages/SettingPage";
import InventoryStorePages from "@/features/setting/pages/InventoryStorePages.tsx";

const StoreRoutes =[
    {
        path:'/settings',
        element:<SettingPage/>
    },
    {
        path:'store',
        element:<InventoryStorePages/>
    }

]

export default StoreRoutes;