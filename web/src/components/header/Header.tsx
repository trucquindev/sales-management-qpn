import { Link } from 'react-router-dom';
import {
  MapPin,
  Heart,
  ShoppingCart,
  ChevronDown,
  Phone,
  X
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
import { useEffect, useState } from 'react';
// import image1 from '@/assets/images/imageProducts/image-1.png';
import { getAllWishlistByUserIdAPI } from '@/apis';
import { deleteShoppingCard, getShoppingCardCustomer } from '@/apis/shop/product';
// import image1 from '@/assets/images/imageProducts/image-3.png';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, selectCurrentUser, logoutUser } from '@/redux/user/userSlice'; // Thêm các selector và action từ userSlice
import { useDispatch, useSelector } from 'react-redux';
interface CartIdemWishList {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  userId: string;
  stockstt: boolean;
  image: string;
}
interface Product {
  categoryId: string;
  description: string;
  id: string;
  idAdditionInfor: string | null;
  image: string[];
  name: string;
  price: number;
  sku: number;
  start: number;
  title: string;
  _Destroy: boolean;
}

interface CartItem {
  customerId: string;
  id: string;
  product: Product;
  productId: string;
  quantity: number;
}


export default function Component() {
  const [dataWishList, setDataWishList] = useState<CartIdemWishList[]>([]);

  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const totalShoping = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const userId = '67433030077b3eb2ae98bcad'; // replace with actual user ID
  const fetchDataWishlist = async () => {
    try {
      const response = await getAllWishlistByUserIdAPI(userId);
      setDataWishList(response);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const rs = await getShoppingCardCustomer('674c1749f333612d17d206fe');
      // setIsShoppingCard(rs);
      setCartItems(rs);
    };
    fetchData();
  }, []);

  const sumShoppingCard = cartItems ? cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0) : 0;
  useEffect(() => {
    fetchDataWishlist();
  }, []);
  const totalWishList = dataWishList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const removeFromCartShoping = async (id: string) => {
    if (cartItems) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
    await deleteShoppingCard(id);
  };

  const removeFromCartWishList = (id: string) => {
    setDataWishList(dataWishList.filter((item) => item.id !== id));
  };

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch action Redux
    navigate('/sign-in'); // Điều hướng về trang đăng nhập
  };
  const isAuthenticated = useSelector(selectIsAuthenticated); // Kiểm tra xem người dùng đã đăng nhập chưa
  const currentUser = useSelector(selectCurrentUser);

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
              {isAuthenticated ? (
                <>
                  {/* Hiển thị email người dùng nếu đăng nhập thành công */}
                  <span onClick={() => navigate('/dashboard')} className="hover:text-primary">
                    {currentUser?.email || "User"}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/sign-in" className="hover:text-primary">Sign In</Link>
                  <span>/</span>
                  <Link to="/sign-up" className="hover:text-primary">Sign Up</Link>
                </>
              )}
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
             {isAuthenticated &&  <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-xs text-white flex items-center justify-center">
                      {dataWishList.length}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent className='overflow-y-auto'>
                  <SheetHeader>
                    <SheetTitle>My wishlist ({dataWishList.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {dataWishList.map((item) => (
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
                            {item.unit} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCartWishList(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-medium">${totalWishList.toFixed(2)}</span>
                      </div>
                      <SheetClose asChild>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          type="submit"
                          onClick={() => navigate('/wishlist')}
                        >
                          Go to my wishlist
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>}
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated && <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-xs text-white flex items-center justify-center">
                      {sumShoppingCard}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      Shopping Cart ({sumShoppingCard})
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {cartItems?.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={`/images/imageProducts/${item.product.image[0]}`}
                          alt={item.product.name}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCartShoping(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-medium">${totalShoping?.toFixed(2)}</span>
                      </div>
                      <SheetClose asChild>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          type="submit"
                          onClick={() => navigate('/shopping-cart')}
                        >
                          Shopping Cart
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>}
              <div className="flex flex-col">
                {isAuthenticated && <div>
                  <span className="text-xs text-muted-foreground">
                  Shopping cart:
                </span>
                <span className="font-medium">$57.00</span></div>}
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
