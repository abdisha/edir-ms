export interface CreateFuneralEvent {
    deceasedPersonFullName: string
    funeralName: string
    relationShip: string
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