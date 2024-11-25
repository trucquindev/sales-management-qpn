import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Component() {
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                    <div className="grid md:grid-cols-[2fr,1fr] gap-8">
                        {/* User Information */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="Dianne" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Russell" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="dianne.russell@gmail.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="(603) 555-0123" />
                            </div>
                            <Button className="bg-green-500 hover:bg-green-600">Save Changes</Button>
                        </div>

                        {/* Profile Image */}
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-24 h-24">
                                {profileImage ? (
                                    <AvatarImage src={profileImage} alt="Profile" />
                                ) : (
                                    <AvatarFallback>DR</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="text-center">
                                <Button
                                    variant="outline"
                                    className="border-green-500 text-green-500 hover:bg-green-50"
                                    onClick={() => document.getElementById("imageUpload")?.click()}
                                >
                                    Change Image
                                </Button>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="billingFirstName">First Name</Label>
                                <Input id="billingFirstName" placeholder="Dianne" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="billingLastName">Last Name</Label>
                                <Input id="billingLastName" placeholder="Russell" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name (Optional)</Label>
                            <Input id="companyName" placeholder="UNKNOWN" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="streetAddress">Street Address</Label>
                            <Input id="streetAddress" placeholder="4140 Parker Rd." />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Country / Region</Label>
                                <Select defaultValue="us">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="mx">Mexico</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Select defaultValue="wa">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="wa">Washington DC</SelectItem>
                                        <SelectItem value="ny">New York</SelectItem>
                                        <SelectItem value="ca">California</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input id="zipCode" placeholder="20033" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="billingEmail">Email</Label>
                                <Input id="billingEmail" type="email" placeholder="dianne.russell@gmail.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="billingPhone">Phone</Label>
                                <Input id="billingPhone" type="tel" placeholder="(603) 555-0123" />
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button className="bg-green-500 hover:bg-green-600">Save Changes</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
                <CardContent className="flex items-center justify-center h-[400px]">
                    <div className="w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-6 text-center">Change Password</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                            <div className="flex justify-center">
                                <Button className="bg-green-500 hover:bg-green-600">Change Password</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
