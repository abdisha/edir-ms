

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import FuneralEventForm from "@/features/funeral/components/FuneralEventForm.tsx";
// Define interfaces for the data
interface FuneralDetail {
    id: string;
    name: string;
    date: string; // Could be Date type, but string is fine for display
    location: string;
    description: string;
    // Add other relevant funeral details here
}

interface IssuedItem {
    id: string;
    itemCode: string;
    itemName: string;
    status: 'Issued' | 'Requested' | 'Returned';
    quantity: number;
}

const FuneralEventPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [funeralDetails, setFuneralDetails] = useState<FuneralDetail | null>(null);
    const [issuedItems, setIssuedItems] = useState<IssuedItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId || eventId =="new-funeral-event") {
            setLoading(false);
            return;
        }

        const fetchFuneralData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock data based on funeralId
                const mockFuneralData: FuneralDetail = {
                    id: eventId,
                    name: `Funeral Service for John Doe (ID: ${eventId})`,
                    date: '2023-10-26',
                    location: 'St. Mary\'s Church Hall',
                    description: 'A memorial service to celebrate the life of John Doe.',
                };

                const mockIssuedItems: IssuedItem[] = [
                    { id: 'item1', itemCode: 'C001', itemName: 'Chairs', status: 'Issued', quantity: 50 },
                    { id: 'item2', itemCode: 'T005', itemName: 'Tables', status: 'Issued', quantity: 10 },
                    { id: 'item3', itemCode: 'F010', itemName: 'Flowers', status: 'Requested', quantity: 5 },
                    { id: 'item4', itemCode: 'S002', itemName: 'Sound System', status: 'Issued', quantity: 1 },
                    { id: 'item5', itemCode: 'L003', itemName: 'Lighting', status: 'Requested', quantity: 2 },
                ];

                setFuneralDetails(mockFuneralData);
                setIssuedItems(mockIssuedItems);

            } catch (err) {
                console.error("Failed to fetch funeral data:", err);
                setError("Failed to load funeral details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFuneralData();
    }, [eventId]);

    if (loading) {
        return <div className="p-4">Loading funeral details...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    if(eventId =="new-funeral-event"){
        return <FuneralEventForm members={[]} onSubmit={()=>{}}/>
    }

    if (!funeralDetails) {
        return <div className="p-4">No funeral details found.</div>;
    }

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Funeral Event Details</h1>
                <div className=" shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-2">{funeralDetails.name}</h2>
                    <p><strong>Date:</strong> {funeralDetails.date}</p>
                    <p><strong>Location:</strong> {funeralDetails.location}</p>
                    <p><strong>Description:</strong> {funeralDetails.description}</p>
                    <p><strong>Funeral ID:</strong> {funeralDetails.id}</p>
                </div>

                <h2 className="text-xl font-bold mb-4">Issued Items</h2>
                <div className="overflow-x-auto  shadow-md rounded-lg">
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
                                        <TableCell>{item.itemName}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            <Button

                                                onClick={() => alert(`Removing ${item.itemName}`)}
                                                className="text-red-600 hover:text-red-900 mr-3"
                                            >
                                                Remove
                                            </Button>
                                            <button
                                                onClick={() => alert(`Requesting more of ${item.itemName}`)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Request
                                            </button>
                                            <button
                                                onClick={() => alert(`Editing quantity for ${item.itemName}`)}
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
                </div>
            </div>
        </>
    )
}
export default FuneralEventPage;