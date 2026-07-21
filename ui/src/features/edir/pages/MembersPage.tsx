import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Plus, Users} from "lucide-react";
import {Separator} from "@/shared/components/ui/separator.tsx";
import {useNavigate} from "react-router";
import {MemberTable} from "@/features/edir/components/MembersTable.tsx";
import {useGetMembers} from "@/features/edir/hooks/useGetMembers.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";

const MembersPage = () => {
    const navigation = useNavigate();
    const {data,error,isPending} = useGetMembers(0,10);

    if(isPending){
        return <SpinnerPage/>
    }
    if(error){
        return <PageError/>
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>
                        Members
                    </CardTitle>
                    <CardDescription>
                        Manage members registered under this Edir
                    </CardDescription>

                </div>
                <Button onClick={()=>navigation('/add-members')}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Member
                </Button>
            </CardHeader>

            <Separator/>
            <CardContent className="pt-6">
                {
                    data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="rounded-full bg-primary/10 p-5">
                                <Users className="h-12 w-12 text-primary"/>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">
                                No members yet
                            </h3>
                            <p className="mt-2 max-w-md text-muted-foreground">
                                Start building your Edir community by adding members.
                                Registered members will appear here with their contribution
                                history and participation records.
                            </p>
                            <Button className="mt-6"
                             onClick={()=>{
                                 navigation("/add-members")
                             }}
                            >
                                <Plus className="mr-2 h-4 w-4"/>
                                Add First Member
                            </Button>
                        </div>

                    ) : (

                        <MemberTable
                            onPageChange={page=>console.log(page)}
                            loading={isPending}
                          pagination={
                            {
                                currentPage:data.pageNumber,
                                pageSize:data.pageSize,
                                totalItems:data.totalElements,
                                totalPages:data.totalPages
                            }
                          }
                            data={data.content}
                        />

                    )
                }



            </CardContent>


        </Card>

  );
};

export default MembersPage;