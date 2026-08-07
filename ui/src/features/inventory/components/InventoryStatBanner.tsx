import {AlertTriangle, ArrowUpRight, Package} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";

interface InventoryStatBannerProp {
    totalItems: number,
    damagedCount: number,
    issuedCount: number
}

const InventoryStatBanner = ({totalItems, damagedCount, issuedCount}: InventoryStatBannerProp) => {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventory Management Hub</h1>
                    <p className="text-sm text-muted-foreground">Manage inventory, track issues, and monitor returned
                        items.</p>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-border/50 shadow-xs bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock Items</CardTitle>
                        <div
                            className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Package className="h-4 w-4"/>
                        </div>
                    </CardHeader>
                    <CardContent className="py-2 px-3">
                        <div className="text-2xl font-bold text-foreground">{totalItems}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all storage spaces</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-xs bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Issued Items</CardTitle>
                        <div
                            className="h-7 w-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                            <ArrowUpRight className="h-4 w-4"/>
                        </div>
                    </CardHeader>
                    <CardContent className="py-2 px-3">
                        <div className="text-2xl font-bold text-foreground">{issuedCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Currently checked out to users</p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-xs bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Damaged Stock</CardTitle>
                        <div
                            className="h-7 w-7 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
                            <AlertTriangle className="h-4 w-4"/>
                        </div>
                    </CardHeader>
                    <CardContent className="py-2 px-3">
                        <div className="text-2xl font-bold text-foreground">{damagedCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Requires maintenance or disposal</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default InventoryStatBanner;