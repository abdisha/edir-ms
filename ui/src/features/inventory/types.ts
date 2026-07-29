export interface InventoryItem {
    itemId: string;
    itemCode:string;
    itemName: string;
    itemStatus:"ACTIVE"|"INACTIVE"
    quantity: number;
    allocated: number;
}
export interface CreateItemRequest{
    itemCode:string;
    itemName:string;
    initialQuantity:number;
}
export interface InventoryIssue {
    reportedDate: undefined;
    reportedBy:undefined;
    issueType: undefined;
    item: undefined;
    id:string;
    status:string;
}

export interface ReturnedItem{
    id:string;
    item:string;
    returnedBy:string;
    returnDate:string;
    condition:"GOOD"|"DAMAGED"|"MISSING_PARTS";

}

export interface Store{
    id?:string;
    name:string;
    location:string;
    ownerId:string;
}

export interface Allocation {
    storeId: string
    storeName: string
    ownerId: string
    ownerName: string
    allocationId: string
    itemId: string
    itemName: string
    itemCode: string
    quantityAtHand: number
    issuedQuantity: number
    receivedDate: string
}

export interface StoreAllocationSummary {
    storeId: string
    storeName: string
    location: string
    totalItem: number
}

