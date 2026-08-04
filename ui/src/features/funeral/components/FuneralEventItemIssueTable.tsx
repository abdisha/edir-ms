import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import type {ReadItemIssue} from "@/features/funeral/types/types.ts";
import {Skeleton} from "@/shared/components/ui/skeleton.tsx";

interface FuneralEventItemIssueTableProp {
    issuedItems:ReadItemIssue[];
    onRemove?:(itemId:string)=>void;
    isLoading:boolean;
    onEditQuantity?:(itemId:string)=>void;
}
export const FuneralEventItemIssueTable =({issuedItems,isLoading, onRemove, onEditQuantity}:FuneralEventItemIssueTableProp)=>{


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Item Code</TableHead>
                        <TableHead className="text-left">Item Name</TableHead>
                        <TableHead className="text-left">Status</TableHead>
                        <TableHead className="text-left">Quantity</TableHead>
                        <TableHead className="text-left">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium"><Skeleton className="h-4 w-[100px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                                <TableCell><div className="flex space-x-2"><Skeleton className="h-8 w-[70px]" /><Skeleton className="h-8 w-[70px]" /><Skeleton className="h-8 w-[100px]" /></div></TableCell>
                            </TableRow>
                        ))
                    ) : issuedItems.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">No items issued yet.</TableCell>
                        </TableRow>
                    ) : (
                        issuedItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.itemCode}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.itemCode}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => onRemove?.(item.id)}
                                        className="text-red-600 hover:text-red-900 mr-3"
                                    >
                                        Remove
                                    </Button>
                                    <button
                                        onClick={() => alert(`Requesting more of ${item.id}`)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        Request
                                    </button>
                                    <Button
                                        onClick={() => onEditQuantity?.(item.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit Quantity
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}
