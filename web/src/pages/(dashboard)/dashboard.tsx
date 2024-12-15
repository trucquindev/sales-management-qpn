import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-xl font-semibold">Please log in to view your dashboard</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-[1400px] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Information */}
                <Card className="p-6">
                    <CardHeader>
                        <div className="flex flex-col items-center">
                            <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                                {user?.email.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-lg font-semibold mt-4">{user?.email}</h2>
                            <p className="text-sm text-gray-500">Customer</p>
                        </div>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button
                            className="bg-green-500 text-white hover:bg-green-600 px-4 py-2"
                            onClick={() => navigate("/settings")}
                        >
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
                            <p className="text-base font-semibold">{user?.name}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                            <p className="text-sm text-gray-500">{user?.phone || 'Phone number not available yet'}</p>
                            <p className="text-sm text-gray-500">{user?.address || 'No billing address available yet'}</p>
                            <Button
                                className="mt-4 bg-green-500 text-white hover:bg-green-600 px-4 py-2"
                                onClick={() => navigate("/settings")}
                            >
                                Edit Address</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}