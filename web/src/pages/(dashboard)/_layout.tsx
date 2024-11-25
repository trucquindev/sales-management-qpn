import { Outlet, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useState } from 'react';

export default function Layout() {
    const [selected, setSelected] = useState('Dashboard');

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Breadcrumb với hình nền */}
            <div
                className="bg-cover bg-center py-6 px-4"
                style={{
                    backgroundImage: `url('/path-to-your-image.jpg')`, // Đường dẫn tới hình nền
                }}
            >
                <div className="container mx-auto flex items-center gap-2 text-sm text-gray-400">
                    <Link to="/" className="flex items-center text-gray-400 hover:text-green-500">
                        <FaHome className="mr-1" />
                    </Link>
                    <MdChevronRight className="text-gray-400" />
                    <Link className="text-gray-400 hover:text-green-500" to="#">
                        Account
                    </Link>
                    <MdChevronRight className="text-gray-400" />
                    <span className="text-green-500">{selected}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-5 gap-3 flex-grow">
                {/* Sidebar Navigation */}
                <Card className="col-span-1 h-80">
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
                                    onClick={() => setSelected(item.name)}
                                >
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start gap-2 h-10 px-2 ${selected === item.name ? 'font-bold text-black bg-green-50' : 'text-gray-500'}`}
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

            {/* Newsletter Subscription */}
            <footer className="w-full bg-gray-100 py-8 px-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left">
                        <h2 className="text-lg font-medium">Subscribe to our Newsletter</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit et eu magna.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 mt-4 md:mt-0">
                        <Input placeholder="Your email address" type="email" className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md" />
                        <Button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md">
                            Subscribe
                        </Button>
                        <div className="flex gap-2 md:ml-4">
                            <Button size="icon" variant="ghost" className="text-gray-500 hover:text-green-500">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-gray-500 hover:text-green-500">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-gray-500 hover:text-green-500">
                                <Instagram className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
