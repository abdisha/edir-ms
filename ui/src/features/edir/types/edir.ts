export interface Edir{
    id:string;
    name:string;
    description:string;
    establishedYear:number;
    createdAt:string;
    updatedAt:string;

}
export interface UpdateEdirRequest{
    id:string;
    name:string;
    description:string;
    establishedYear:number;
}

export interface CreateEdirRequest {
    edirName: string
    establishedDate: Date
    description?: string
    address: Address
    phoneNumber: string
}

export interface Address {
    city: string
    subcity: string
    worda: string
}

