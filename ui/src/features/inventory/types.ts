export interface InventoryItem {
    id: string;
    itemCode:string;
    itemName: string;
    itemStatus:"Active"|"InActive"
    quantity: number;
}
export interface CreateItemRequest{
    itemCode:string;
    itemName:string;
    initialQuantity:number;
}