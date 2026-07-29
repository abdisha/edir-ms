export const inventoryKeys = {
   allInventory:['inventory'] as const,
   allUnAllocatedItem:['unAllocated'] as const,
   storeAllocation:(id?: string)=>['store-allocation',id]as const,
   stores:["stores"] as const
};