import {
    ArrowLeft,
    CalendarDays,
    Edit,
    MapPin,
    Phone,
    Trash2,
    User,
    Wallet,
    Users,
    Clock,
} from "lucide-react";

import { Link } from "react-router";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

import {
    Button
} from "@/shared/components/ui/button";

import {
    Badge
} from "@/shared/components/ui/badge";
import type {Member} from "@/features/members/types/members.ts";



const member: Member = {

    id: "1",

    firstName: "Abebe",

    lastName: "Kebede",

    age: 35,

    phoneNumber: "0911223344",

    status: "ACTIVE",

    address: {

        city: "Addis Ababa",

        subcity: "Bole",

        woreda: "03",

        zone: "1",

    },

};





export default function MemberDetailPage() {


    const fullName =
        `${member.firstName} ${member.lastName}`;


    const initials =
        `${member.firstName[0]}${member.lastName[0]}`;



    return (
        <div className="space-y-8">
            {/* Back */}
            <Button
                variant="ghost"
                className="gap-2"
                size="lg"
            >
                <Link to="/members" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4"/>
                    Back to Members
                </Link>
            </Button>
            {/* Profile Header */}
            <Card className="overflow-hidden">
                <div className="h-2 bg-linear-to-r from-blue-800 via-blue-500/70 to-blue-200/30"/>
                <CardContent className="p-8">
                    <div className=" flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-700/10 text-3xl font-bold text-primary">

                                {initials}

                            </div>



                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-4xl font-bold tracking-tight" >
                                        {fullName}
                                    </h1>
                                    <Badge variant={member.status === "ACTIVE" ? "default" : "secondary"} color={'green'}>
                                       <span className={"font-bold"  + (member.status === "ACTIVE" ? " text-green-700" : " text-red-700")}>{member.status}</span></Badge>


                                </div>



                                <p className="
mt-2
text-muted-foreground
"
                                >

                                    Edir Member ID: {member.id}

                                </p>



                                <div className="
mt-4
flex
flex-wrap
gap-5
text-sm
text-muted-foreground
">


<span className="flex items-center gap-2">

<Phone className="h-4 w-4"/>

    {member.phoneNumber}

</span>



                                    <span className="flex items-center gap-2">

<User className="h-4 w-4"/>

Age {member.age}

</span>


                                </div>


                            </div>


                        </div>





                        <div className="
flex
gap-3
">


                            <Button>


                                <Edit className="mr-2 h-4 w-4"/>

                                Edit


                            </Button>



                            <Button
                                variant="destructive"
                            >


                                <Trash2 className="mr-2 h-4 w-4"/>

                                Delete


                            </Button>


                        </div>


                    </div>


                </CardContent>


            </Card>








            {/* Summary Cards */}

            <div className="
grid
gap-5
md:grid-cols-3
">


                <Card>


                    <CardHeader>

                        <CardDescription>
                            Total Contribution
                        </CardDescription>


                        <CardTitle className="text-3xl">

                            0 ETB

                        </CardTitle>


                    </CardHeader>


                    <CardContent>


                        <div className="
flex
items-center
gap-2
text-sm
text-muted-foreground
">

                            <Wallet className="h-4 w-4"/>

                            No payment recorded yet

                        </div>


                    </CardContent>


                </Card>





                <Card>


                    <CardHeader>

                        <CardDescription>
                            Member Since
                        </CardDescription>


                        <CardTitle className="text-3xl">

                            2026

                        </CardTitle>


                    </CardHeader>


                    <CardContent>


                        <div className="
flex
items-center
gap-2
text-sm
text-muted-foreground
">

                            <CalendarDays className="h-4 w-4"/>

                            Registration year

                        </div>


                    </CardContent>


                </Card>






                <Card>


                    <CardHeader>

                        <CardDescription>
                            Participation
                        </CardDescription>


                        <CardTitle className="text-3xl">

                            Active

                        </CardTitle>


                    </CardHeader>


                    <CardContent>


                        <div className="
flex
items-center
gap-2
text-sm
text-muted-foreground
">

                            <Users className="h-4 w-4"/>

                            Community member

                        </div>


                    </CardContent>


                </Card>



            </div>









            <div className="
grid
gap-8
lg:grid-cols-2
">





                {/* Personal Information */}

                <Card>


                    <CardHeader>

                        <CardTitle>
                            Personal Information
                        </CardTitle>


                        <CardDescription>
                            Basic member details
                        </CardDescription>


                    </CardHeader>



                    <CardContent className="space-y-5">


                        <InfoRow
                            icon={<User/>}
                            label="Full Name"
                            value={fullName}
                        />



                        <InfoRow
                            icon={<User/>}
                            label="Age"
                            value={`${member.age} years old`}
                        />




                        <InfoRow
                            icon={<Phone/>}
                            label="Phone Number"
                            value={member.phoneNumber}
                        />


                    </CardContent>


                </Card>









                {/* Address */}

                <Card>


                    <CardHeader>

                        <CardTitle>
                            Address
                        </CardTitle>


                        <CardDescription>
                            Member residential information
                        </CardDescription>


                    </CardHeader>



                    <CardContent>


                        <div className="
rounded-xl
bg-muted/40
p-5
space-y-4
">


                            <InfoRow
                                icon={<MapPin/>}
                                label="City"
                                value={member.address.city}
                            />



                            <InfoRow
                                icon={<MapPin/>}
                                label="Subcity"
                                value={member.address.subcity}
                            />



                            <InfoRow
                                icon={<MapPin/>}
                                label="Woreda"
                                value={member.address.woreda}
                            />



                            <InfoRow
                                icon={<MapPin/>}
                                label="Zone"
                                value={member.address.zone}
                            />



                        </div>


                    </CardContent>


                </Card>




            </div>









            {/* Activity */}

            <Card>


                <CardHeader>

                    <CardTitle>
                        Recent Activity
                    </CardTitle>


                    <CardDescription>
                        Member contribution and event history
                    </CardDescription>


                </CardHeader>



                <CardContent>


                    <div className="
flex
flex-col
items-center
justify-center
py-12
text-center
"
                    >


                        <div
                            className="
rounded-full
bg-primary/10
p-5
"
                        >

                            <Clock
                                className="
h-10
w-10
text-primary
"
                            />


                        </div>



                        <h3 className="
mt-5
font-semibold
"
                        >

                            No activity yet

                        </h3>


                        <p className="
mt-2
max-w-sm
text-muted-foreground
"
                        >

                            Contribution records, meetings, and member activities will appear here.

                        </p>


                    </div>


                </CardContent>


            </Card>





        </div>

    )

}








function InfoRow({
                     icon,
                     label,
                     value
                 }:{
    icon:React.ReactNode;
    label:string;
    value:string;
}){


    return (

        <div className="
flex
items-center
gap-4
"
        >


            <div className="
rounded-lg
bg-primary/10
p-2
text-primary
">

                {icon}

            </div>


            <div>

                <p className="
text-sm
text-muted-foreground
">

                    {label}

                </p>


                <p className="
font-medium
">

                    {value}

                </p>


            </div>


        </div>

    )

}