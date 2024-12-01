import { Link } from 'react-router-dom';
import {
  MapPin,
  Heart,
  ShoppingCart,
  ChevronDown,
  Phone,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { useNavigate } from'react-router-dom';
import image2 from '@/assets/images/imageProducts/image-2.png';
import image1 from '@/assets/images/imageProducts/image-1.png';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

export default function Component() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Fresh Indian Orange',
      price: 12.0,
      quantity: 1,
      weight: '1 kg',
      image: image2,
    },
    {
      id: '2',
      name: 'Green Apple',
      price: 14.0,
      quantity: 1,
      weight: '1 kg',
      image: image1,
    },
  ]);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  const navigate = useNavigate();
  return (
    <header className="w-full flex flex-col items-center border">
      {/* Top bar */}
      <div className="w-full border-b flex justify-center items-center h-[50px]">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Store Location: Lincoln-344, Illinois, Chicago, USA</span>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                Eng
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                USD <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
                <DropdownMenuItem>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-2">
              <Link to="/sign-in" className="hover:text-primary">
                Sign In
              </Link>
              <span>/</span>
              <Link to="/sign-up" className="hover:text-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-6 w-full">
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-green-600">●</span> Ecobazar
          </Link>

          <div className="flex flex-1 max-w-xl">
            <Input
              type="search"
              placeholder="Search"
              className="rounded-r-none border-r-0"
            />
            <Button className="rounded-l-none bg-green-600 hover:bg-green-700">
              Search
            </Button>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5"/>
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-xs text-white flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>My wishlist ({cartItems.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.weight} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-medium">${total.toFixed(2)}</span>
                      </div>
                      <SheetClose asChild>
                        <Button className="w-full bg-green-600 hover:bg-green-700" type="submit" onClick={()=>navigate('/wishlist')}>
                          Go to my wishlist
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-xs text-white flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.weight} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-medium">${total.toFixed(2)}</span>
                      </div>
                      <SheetClose asChild>
                        <Button className="w-full bg-green-600 hover:bg-green-700" type="submit" onClick={()=>navigate('/shopping-cart')}>
                          Shopping Cart
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Shopping cart:
                </span>
                <span className="font-medium">$57.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-zinc-900 text-white w-full px-4">
        <div className="container flex items-center justify-between py-4">
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:text-green-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="flex items-center gap-1 hover:text-green-500"
                >
                  Shop
                </Link>
              </li>
              
              <li>
                <Link
                  to="/blog"
                  className="flex items-center gap-1 hover:text-green-500"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2 text-green-500">
            <Phone className="h-5 w-5" />
            <span>(219) 555-0114</span>
          </div>
        </div>
      </div>
    </header>
  );
}
