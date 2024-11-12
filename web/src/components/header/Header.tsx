import { Link } from 'react-router-dom';
import { MapPin, Heart, ShoppingCart, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function Component() {
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
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-6 w-6" />
              <p className="w-3 h-3 flex justify-center items-center rounded-full bg-primary text-[8px] absolute top-1 right-0">
                2
              </p>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                <p className="w-3 h-3 flex justify-center items-center rounded-full bg-primary text-[8px] absolute top-1 right-0">
                  2
                </p>
              </Button>
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
                  to="/pages"
                  className="flex items-center gap-1 hover:text-green-500"
                >
                  Pages
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
