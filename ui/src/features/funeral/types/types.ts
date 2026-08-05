export interface CreateFuneralEvent {
    deceasedPersonFullName: string
    funeralName: string
    relationShip: "SPOUSE"|
    "FATHER"|
    "MOTHER"|
    "SON"|
    "DAUGHTER"|
    "BROTHER"|
    "SISTER"|
    "GRANDFATHER"|
    "GRANDMOTHER"|
    "RELATIVE" | "OTHER"
    payout: number
    funeralDate: Date
    funeralAddress: string
    memberId: string
}

export  interface FuneralEvent{
    funeralId: string;
    funeralName: string;
    deceasedPersonFullName: string;
    relationShip: string;
    funeralDate: string;
    payout: number;
    memberId: string;
    isClose: boolean;
}

export interface ReadItemIssue {
    id:string;
    itemCode:string;
    name:string;
    quantity:number;
}

export interface UpInsItemIssue {
    funeralId:string;
    itemCode:string;
    name:string;
    quantity:number;
}


export const relationshipOptions = [
    "SPOUSE",
    "FATHER",
    "MOTHER",
    "SON",
    "DAUGHTER",
    "BROTHER",
    "SISTER",
    "GRANDFATHER",
    "GRANDMOTHER",
    "RELATIVE",
    "OTHER",
] as const;

export interface MeetingEvent {
    id: string;
    meetingName: string;
    agenda: string;
    location: string;
    eventDate: string;
    isClosed: boolean;
}

