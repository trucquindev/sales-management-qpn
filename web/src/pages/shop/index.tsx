import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import {
  getAllCategoryAPI,
  getAllProductAPI,
  postShoppingCard,
} from '@/apis/shop/product';
import { useEffect, useState } from 'react';
import { getAllWishlistByUserIdAPI, postWishlistAPI } from '@/apis';
import { toast } from 'react-toastify';
interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}
interface WishList {
  id?: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stockstt: boolean;
  userId: string;
  unit: string;
}
export default function Shop() {
  const [isProduct, setIsProduct] = useState<
    { id: string; name: string; price: number; rating: number; image: string }[]
  >([]);
  const [isCategory, setIsCategory] = useState<{ id: number; name: string }[]>(
    []
  );

  const navigate = useNavigate();
  const [dataWishList, setDataWishList] = useState<WishList[]>([]);
  const userId = '67433030077b3eb2ae98bcad';
  const [isClick, setIsClick] = useState(false);
  const fetchDataWishList = async () => {
    try {
      const response = await getAllWishlistByUserIdAPI(userId);
      console.log('response~wishlist ', response);
      setDataWishList(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchDataWishList();
  }, [isClick]);
  const fetchData = async () => {
    try {
      const responseCategory = await getAllCategoryAPI();
      setIsCategory(responseCategory);

      const responseProduct = await getAllProductAPI();
      setIsProduct(responseProduct);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  const handleClickAddCart = async (id: string) => {
    await postShoppingCard('674c1749f333612d17d206fe', id);
  };

  const handleClickAddCartToWishlist = async (product: Product) => {
    const userId = '67433030077b3eb2ae98bcad';
    let initData: WishList = {
      productId: product.id,
      name: product.name,
      price: product.price,
      stockstt: true,
      userId: userId,
      image: product.image[0],
      quantity: 1,
      unit: '1kg',
    };

    const check = dataWishList.find(
      (data) => data.productId === initData.productId
    );
    if (check) {
      toast.warn('Bạn đã thêm sản phẩm này vào danh sách yêu thích rồi!');
    } else {
      await postWishlistAPI(initData);
      toast.success('Thêm thành công vào danh sách yêu thích');
    }
    setIsClick(!isClick);
  };
  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:p-6">
      {/* Sidebar */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">All Categories</h3>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {isCategory.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm">$0</span>
            <span className="text-sm">$100</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input type="checkbox" className="form-checkbox" />
                <div className="flex">
                  {Array.from({ length: rating }).map(() => (
                    <Star
                      key={`star-${rating}-${Math.random()}`}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Organic</Badge>
            <Badge variant="secondary">Fresh</Badge>
            <Badge variant="secondary">Vegetable</Badge>
            <Badge variant="secondary">Fruit</Badge>
          </div>
        </div>

        <Card className="bg-green-50 dark:bg-green-950">
          <CardContent className="p-4">
            <h3 className="font-bold text-xl mb-2">75% Discount</h3>
            <p className="text-sm text-muted-foreground">on new products</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="md:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isProduct.map((product) => (
            <Card
              key={product.id}
              className="group"
              onClick={() => navigate(`/shop/products/${product.id}`)}
            >
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={`/images/imageProducts/${product.image}`}
                    alt={product.name}
                    className="object-cover rounded-lg w-full h-full"
                  />
                  <div className="flex flex-row">
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-14 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickAddCart(product.id.toString());
                      }}
                    >
                      +
                    </Button>
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsClick(true);
                        handleClickAddCartToWishlist(product);
                      }}
                    >
                      <Heart />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? 'default' : 'outline'}
              size="icon"
              className="w-8 h-8"
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
