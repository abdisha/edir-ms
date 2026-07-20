export interface Address {
    city: string;
    woreda: string;
    zone: string;
    subcity: string;
}


export interface Member {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
    status:'ACTIVE'|'INACTIVE';
    phoneNumber: string;
    address: Address;
}