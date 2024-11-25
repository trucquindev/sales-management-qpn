import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Order {
    id: string;
    date: string;
    total: number;
    products: number;
    status: "Processing" | "On the way" | "Completed";
}

export default function Component() {
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const navigate = useNavigate(); // React Router's navigate function

    const orders: Order[] = [
        { id: "3913", date: "4 April, 2021", total: 138.0, products: 5, status: "Processing" },
        { id: "5045", date: "27 Mar, 2021", total: 25.0, products: 1, status: "On the way" },
        { id: "8108", date: "20 Mar, 2021", total: 250.5, products: 4, status: "Completed" },
        { id: "4600", date: "19 Mar, 2021", total: 35.0, products: 1, status: "Completed" },
        { id: "4102", date: "18 Mar, 2021", total: 578.8, products: 3, status: "Completed" },
        { id: "8181", date: "15 Mar, 2021", total: 348.0, products: 7, status: "Completed" },
        { id: "3536", date: "5 Mar, 2021", total: 850.0, products: 2, status: "Completed" },
        { id: "3174", date: "27 Feb, 2021", total: 540.0, products: 2, status: "Completed" },
        { id: "7731", date: "25 Feb, 2021", total: 560.0, products: 3, status: "Completed" },
        { id: "4548", date: "24 Feb, 2021", total: 23.0, products: 1, status: "Completed" },
    ];

    const totalPages = 3; // Assume total 3 pages for demonstration

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleViewDetails = (orderId: string) => {
        navigate(`/orderdetail`); // Navigate to OrderDetail page with orderId as a param
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left p-3 text-sm font-medium">ORDER ID</th>
                                <th className="text-left p-3 text-sm font-medium">DATE</th>
                                <th className="text-left p-3 text-sm font-medium">TOTAL</th>
                                <th className="text-left p-3 text-sm font-medium">STATUS</th>
                                <th className="text-right p-3 text-sm font-medium">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="p-3 text-sm">#{order.id}</td>
                                    <td className="p-3 text-sm">{order.date}</td>
                                    <td className="p-3 text-sm">
                                        ${order.total.toFixed(2)} ({order.products} Product
                                        {order.products !== 1 ? "s" : ""})
                                    </td>
                                    <td className="p-3 text-sm">
                                        <span
                                            className={
                                                order.status === "Processing"
                                                    ? "text-yellow-600"
                                                    : order.status === "On the way"
                                                        ? "text-blue-600"
                                                        : "text-green-600"
                                            }
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-right">
                                        <Button
                                            variant="link"
                                            className="text-green-600 h-auto p-0"
                                            onClick={() => handleViewDetails(order.id)}
                                        >
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Section */}
                <div className="border-t p-2 flex items-center justify-center">
                    <div className="flex items-center gap-1">
                        {/* Previous Page Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={currentPage === 1}
                            className="h-8 w-8"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous page</span>
                        </Button>
                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <Button
                                key={page}
                                size="sm"
                                className={`h-8 w-8 ${currentPage === page
                                    ? "bg-green-500 text-white font-bold"
                                    : "bg-white text-black"
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        {/* Next Page Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={currentPage === totalPages}
                            className="h-8 w-8"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next page</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
