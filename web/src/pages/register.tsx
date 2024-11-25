import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";

export default function Component() {
    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb với hình nền */}
            <div
                className="bg-cover bg-center py-6 px-4"
                style={{
                    backgroundImage: `url('/path-to-your-image.jpg')`,
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
                    <Link className="text-green-500" to="#">
                        Create Account
                    </Link>
                </div>
            </div>

            {/* Login Card */}
            <div className="container mx-auto px-4 py-6">
                <div className="mx-auto mt-4 max-w-md">
                    <Card className="border border-gray-200 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold">Create Account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Input placeholder="Email" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Input placeholder="Password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Input placeholder="Confirm Password" type="password" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" />
                                        <label className="text-sm text-gray-600" htmlFor="remember">
                                            Accept all terms & Conditions
                                        </label>
                                    </div>

                                </div>
                                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md" type="submit">
                                    Create Account
                                </Button>
                                <div className="text-center text-sm text-gray-600">
                                    {"Already have account? "}
                                    <Link className="text-green-500 hover:underline" to="/login">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="w-full bg-gray-100 py-8 px-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left">
                        <h2 className="text-lg font-medium">Subscribe our Newsletter</h2>
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
            </div>
        </div>
    );
}
