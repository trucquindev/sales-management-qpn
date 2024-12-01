import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function Component() {
    return (
        <div className="min-h-screen bg-white">


            {/* Login Card */}
            <div className="container mx-auto px-4 py-6">
                <div className="mx-auto mt-4 max-w-md">
                    <Card className="border border-gray-200 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold">Sign In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Input placeholder="Email" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Input placeholder="Password" type="password" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" />
                                        <label className="text-sm text-gray-600" htmlFor="remember">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link className="text-sm text-gray-500 hover:underline" to="#">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md" type="submit">
                                    Login
                                </Button>
                                <div className="text-center text-sm text-gray-600">
                                    {"Don't have an account? "}
                                    <Link className="text-green-500 hover:underline" to="/sign-up">
                                        Register
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}
