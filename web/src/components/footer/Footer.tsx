import { Facebook, Twitter, Instagram, CreditCard, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footers = () => {
  return (
    <footer className="w-full bg-white">
      {/* Newsletter Section */}
      <div className="border-b bg-slate-300/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Subcribe our Newsletter
              </h2>
              <p className="text-muted-foreground">
                Pellentesque eu nibh eget mauris congue mattis mattis nec
                tellus. Phasellus imperdiet elit eu magna.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="max-w-sm"
              />
              <Button className="bg-[#84D187] hover:bg-[#84D187]/90">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-4">
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="text-[#84D187]">🌱</span>
                <span className="text-2xl font-bold">Ecobazar</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Morbi cursus porttitor enim lobortis molestie. Duis gravida
                turpis dui, eget bibendum magna congue nec.
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span>(219) 555-0114</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Proxy@gmail.com</span>
                </p>
              </div>
            </div>

            {/* My Account Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">My Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Helps Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Helps</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Faqs
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Terms & Condition
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Proxy Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Proxy</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Product
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Fruit & Vegetables
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Meat & Fish
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Bread & Bakery
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Beauty & Health
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                Ecobazar eCommerce © 2021. All Rights Reserved
              </p>
              <div className="flex gap-2">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <CreditCard className="h-8 w-8 text-gray-400" />
                <CreditCard className="h-8 w-8 text-gray-400" />
                <CreditCard className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footers;
