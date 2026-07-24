export interface InventoryItem {
    id: string;
    name: string;
    description?: string;
    category: "funeral" | "general";
    quantity: number;
    allocated?: number;
    dateAdded: string;
}