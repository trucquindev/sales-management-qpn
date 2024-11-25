import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import image1 from '@/assets/images/imageProducts/image-3.png';
import { useNavigate } from 'react-router-dom';
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
      price: 14.0,
      quantity: 5,
      image: image1,
    },
    {
      id: 2,
      name: 'Red Capsicum',
      price: 14.0,
      quantity: 5,
      image: image1,
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-8">My Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border p-4">
            <div className="grid grid-cols-4 gap-4 font-medium text-sm text-muted-foreground mb-4 border-b">
              <div className="col-span-2">PRODUCT</div>
              <div>QUANTITY</div>
              <div>SUBTOTAL</div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 gap-4 items-center pb-4"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 0;
                      setItems(
                        items.map((i) =>
                          i.id === item.id ? { ...i, quantity: newQuantity } : i
                        )
                      );
                    }}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between gap-4 border-b p-4">
            <Button variant="outline">Return to shop</Button>
            <Button variant="outline">Update Cart</Button>
          </div>

          <div className="flex gap-4">
            <Input placeholder="Enter code" className="max-w-[200px]" />
            <Button>Apply Coupon</Button>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Cart Total</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/shopping-cart/checkout')}
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
