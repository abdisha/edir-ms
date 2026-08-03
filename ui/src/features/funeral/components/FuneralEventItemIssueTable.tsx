import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import type {ReadItemIssue} from "@/features/funeral/types/types.ts";
interface FuneralEventItemIssueTableProp {
    issuedItems:ReadItemIssue[];
    onRemove?:(itemId:string)=>void;
    onEditQuantity?:(itemId:string)=>void;
}
export const FuneralEventItemIssueTable =({issuedItems}:FuneralEventItemIssueTableProp)=>{
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
                    {issuedItems.length === 0 ? (
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

                                        onClick={() => alert(`Removing ${item.id}`)}
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
                                    <button
                                        onClick={() => alert(`Editing quantity for ${item.id}`)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit Quantity
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}
