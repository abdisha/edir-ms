export interface EdirResponse {
    uuid: string
    edirName: string
    description: string
    city: string
    subcity: string
    worda: string
    establishedDate: Date
    phoneNumber: string
    membersCount: number
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

