import InventoryPage from "@/features/inventory/pages/InventoryPage.tsx";
import InventoryIssuePage from "@/features/inventory/pages/InventoryIssuePage.tsx";

const InventoryRoutes=[
    {
        path:'/inventory',
        element:<InventoryPage/>
    }, {
        path: "/inventory-issue",
        element: <InventoryIssuePage/>
    }
]
export default InventoryRoutes;