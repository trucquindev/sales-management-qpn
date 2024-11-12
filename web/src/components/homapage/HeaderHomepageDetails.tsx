import {
  ArrowRight,
  ShoppingBasket,
  HeadphonesIcon,
  Shield,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import imageHomepage from '@/assets/images/imageHomepage.png';
import summerSale from '@/assets/images/summerSale.png';
const HeaderHomepageDetails = () => {
  return (
    <div className="mx-auto max-w-7xl p-4 space-y-8 shadow-lg">
      {/* Main Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-primary text-white">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh & Healthy
              <br />
              Organic Food
            </h1>
            <div className="mb-4">
              <span className="inline-block bg-[#FF6B35] rounded px-3 py-1 text-sm font-semibold">
                Sale up to 30% OFF
              </span>
            </div>
            <p className="mb-6 text-gray-100">
              Free shipping on all your order.
            </p>
            <Link
              to="#"
              className="inline-flex items-center bg-white text-green-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-[400px] w-full">
            <img
              src={imageHomepage}
              alt="Fresh vegetables and fruits"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Promotional Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Summer Sale Card */}
        <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">SUMMER SALE</p>
            <h2 className="text-4xl font-bold mb-2">75% OFF</h2>
            <p className="text-sm text-gray-600 mb-4">Only Fruit & Vegetable</p>
            <Link
              to="#"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Shop Now
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-32 w-32">
            <img
              src={summerSale}
              alt="Summer sale vegetables"
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Special Products Card */}
        <div className="bg-[#0A2F0A] rounded-xl p-6 text-white">
          <p className="text-sm font-medium mb-2">BEST DEAL</p>
          <h2 className="text-2xl font-bold mb-4">
            Special Products
            <br />
            Deal of the Month
          </h2>
          <Link
            to="#"
            className="inline-flex items-center text-green-400 hover:text-green-300 font-medium"
          >
            Shop Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Service Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <ShoppingBasket className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm text-gray-500">
              Free shipping on all your order
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <HeadphonesIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">Customer Support 24/7</h3>
            <p className="text-sm text-gray-500">Instant access to Support</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">100% Secure Payment</h3>
            <p className="text-sm text-gray-500">
              We ensure your money is save
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <RefreshCw className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">Money-Back Guarantee</h3>
            <p className="text-sm text-gray-500">
              30 Days Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHomepageDetails;
