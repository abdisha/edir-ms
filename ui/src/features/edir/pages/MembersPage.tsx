import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Plus, Users} from "lucide-react";
import {Separator} from "@/shared/components/ui/separator.tsx";
import {useNavigate} from "react-router";
import type {Member} from "@/features/edir/types/members.ts";
import {MemberTable} from "@/features/edir/components/MembersTable.tsx";


const members:Member[]=[

    {
        id:"1",
        firstName:"Abebe",
        lastName:"Kebede",
        age:35,
        phoneNumber:"0911223344",
        status:"ACTIVE",
        address:{
            city:"Addis Ababa",
            subcity:"Bole",
            woreda:"03",
            zone:"1"
        }

    },


    {
        id:"2",
        firstName:"Sara",
        lastName:"Tesfaye",
        age:29,
        phoneNumber:"0922334455",
        status:"ACTIVE",
        address:{
            city:"Addis Ababa",
            subcity:"Yeka",
            woreda:"08",
            zone:"2"
        }

    },



    {
        id:"3",
        firstName:"Hana",
        lastName:"Mulu",
        age:42,
        phoneNumber:"0933445566",
        status:"ACTIVE",
        address:{
            city:"Addis Ababa",
            subcity:"Arada",
            woreda:"05",
            zone:"3"
        }

    },


    {
        id:"4",
        firstName:"Dawit",
        lastName:"Assefa",
        age:51,
        phoneNumber:"0944556677",
        status:"INACTIVE",
        address:{
            city:"Addis Ababa",
            subcity:"Kirkos",
            woreda:"02",
            zone:"4"
        }

    }


];

const MembersPage = () => {

    const navigation = useNavigate();
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
                    members.length === 0 ? (
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
                            data={members}
                        />

                    )
                }



            </CardContent>


        </Card>

  );
};

export default MembersPage;