import { Outlet, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clock, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

export default function Component() {
    const [selected, setSelected] = useState('Dashboard');
    const location = useLocation();

    const handleClick = () => {
        localStorage.removeItem("persist:root");
        localStorage.removeItem("currentUser"); // Xóa thông tin người dùng
    };

    const isSelected = (path: any) => location.pathname === path;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Main Content */}
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-5 gap-3 flex-grow">
                {/* Sidebar Navigation */}
                <Card className="col-span-1 h-64">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Navigation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="space-y-1">
                            {[
                                { name: 'Dashboard', icon: <Home className="h-4 w-4" />, path: '/dashboard' },
                                { name: 'Order History', icon: <Clock className="h-4 w-4" />, path: '/orderhistory' },
                                { name: 'Settings', icon: <Settings className="h-4 w-4" />, path: '/settings' },
                            
                            ].map((item) => (
                                <Link
                                    to={item.path}
                                    key={item.name}
                
                                >
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start gap-2 h-10 px-2 ${
                                            isSelected(item.path) ? 'font-bold text-black bg-green-50' : 'text-gray-500'
                                        }`}
                                    >
                                        {item.icon}
                                        <span className="text-sm">{item.name}</span>
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Content Area */}
                <div className="md:col-span-4">
                    <Outlet /> {/* Hiển thị nội dung của route con */}
                </div>
            </div>
        </div>
    );
}