'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import image1 from '@/assets/images/imageProducts/image-3.png';
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Component() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Green Capsicum',
      price: 10.0,
      quantity: 5,
      image: image1,
    },
    {
      id: 2,
      name: 'Red Capsicum',
      price: 74.0,
      quantity: 2,
      image: image1,
    },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Billing Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Your last name" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="company">Company Name (optional)</Label>
                  <Input id="company" placeholder="Company name" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" placeholder="Email" />
                </div>
                <div>
                  <Label htmlFor="country">Country / Region</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="state">States</Label>
                  <Select>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Selects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" placeholder="Zip Code" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Phone number" type="tel" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Email Address" type="email" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox id="shipping" />
                <Label htmlFor="shipping">Ship to a different address</Label>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Additional Info</h2>
              <div>
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  className="h-32"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex justify-center items-center space-x-4">
                        <div className="w-16 h-16 relative">
                          <img
                            src={item.image}
                            alt="Green Capsicum"
                            className="object-cover rounded"
                          />
                        </div>
                        <p className="text-center mb-4">
                          {item.name} x<span>{item.quantity}</span>
                        </p>
                      </div>
                      <span className="mb-4">${item.price}</span>
                    </div>
                  );
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>$84.00</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between mt-2 text-lg font-semibold">
                    <span>Total:</span>
                    <span>$84.00</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">Paypal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="amazon" id="amazon" />
                      <Label htmlFor="amazon">Amazon Pay</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button className="w-full mt-6" size="lg">
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
