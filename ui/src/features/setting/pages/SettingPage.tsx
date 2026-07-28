import {ChevronRight, Package, Store} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Button} from "@/shared/components/ui/button";
import {useNavigate} from "react-router";

const SettingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your application preferences and configurations.</p>
            </div>

            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Inventory Settings</h2>
                </div>

                <Card className="group hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => navigate('/store')}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-lg font-medium">Store Configuration</CardTitle>
                            <CardDescription>Manage store locations, inventory rules, and stock levels.</CardDescription>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Store className="h-6 w-6" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex justify-end pt-4">
                        <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                            Configure Stores <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default SettingPage;
