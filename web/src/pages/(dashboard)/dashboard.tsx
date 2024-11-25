import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <div className="container mx-auto max-w-[1400px] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Information */}
                <Card className="p-6">
                    <CardHeader>
                        <div className="flex flex-col items-center">
                            <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                                DR
                            </div>
                            <h2 className="text-lg font-semibold mt-4">Dainne Ressell</h2>
                            <p className="text-sm text-gray-500">Customer</p>
                        </div>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2">
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>

                {/* Billing Address */}
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p className="text-base font-semibold">Dainne Ressell</p>
                            <p className="text-sm text-gray-500">4140 Parker Rd. Allentown, New Mexico 31134</p>
                            <p className="text-sm text-gray-500">dainne.ressell@gmail.com</p>
                            <p className="text-sm text-gray-500">(671) 555-0110</p>
                            <Button className="mt-4 bg-green-500 text-white hover:bg-green-600 px-4 py-2">
                                Edit Address
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Order History */}
                <Card className="p-6 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium text-center">Recent Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-4 px-2">Order ID</th>
                                    <th className="py-4 px-2">Date</th>
                                    <th className="py-4 px-2">Total</th>
                                    <th className="py-4 px-2">Status</th>
                                    <th className="py-4 px-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-4 px-2">#738</td>
                                    <td className="py-4 px-2">6 Nov 2020</td>
                                    <td className="py-4 px-2">$159.99 (5 Products)</td>
                                    <td className="py-4 px-2 text-yellow-500">Processing</td>
                                    <td className="py-4 px-2">
                                        <Button className="text-green-500 hover:underline" variant="link">
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 px-2">#737</td>
                                    <td className="py-4 px-2">24 May 2020</td>
                                    <td className="py-4 px-2">$29.99 (1 Product)</td>
                                    <td className="py-4 px-2 text-blue-500">On The Way</td>
                                    <td className="py-4 px-2">
                                        <Button className="text-green-500 hover:underline" variant="link">
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 px-2">#736</td>
                                    <td className="py-4 px-2">27 Oct 2020</td>
                                    <td className="py-4 px-2">$1250.00 (3 Products)</td>
                                    <td className="py-4 px-2 text-green-500">Completed</td>
                                    <td className="py-4 px-2">
                                        <Button className="text-green-500 hover:underline" variant="link">
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 px-2">#735</td>
                                    <td className="py-4 px-2">11 Feb 2020</td>
                                    <td className="py-4 px-2">$39.99 (1 Product)</td>
                                    <td className="py-4 px-2 text-green-500">Completed</td>
                                    <td className="py-4 px-2">
                                        <Button className="text-green-500 hover:underline" variant="link">
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 px-2">#734</td>
                                    <td className="py-4 px-2">25 Sep 2020</td>
                                    <td className="py-4 px-2">$679.99 (2 Products)</td>
                                    <td className="py-4 px-2 text-green-500">Completed</td>
                                    <td className="py-4 px-2">
                                        <Button className="text-green-500 hover:underline" variant="link">
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 px-2">#733</td>
                                    <td className="py-4 px-2">22 Oct 2020</td>
                                    <td className="py-4 px-2">$345.00 (7 Products)</td>
                                    <td className="py-4 px-2 text-green-500">Completed</td>
                                    <td className="py-4 px-2">
                                        <Button className="text-green-500 hover:underline" variant="link">
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
