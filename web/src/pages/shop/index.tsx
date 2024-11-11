import { Star } from 'lucide-react';
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
import Potato from '@/assets/potato.png';
import Capsicum from '@/assets/capsicum.png';
import ChaniseCabbage from '@/assets/chanise-cabbage.png';
import GreenLettuce from '@/assets/green-littuce.png';
import Eggplant from '@/assets/eggplant.png';
import FreshCauliflower from '@/assets/fresh-cauliflower.png';
import FreshMango from '@/assets/fresh-mango.png';
import GreenApple from '@/assets/green-apple.png';
import GreenCapsicum from '@/assets/green-capsicum.png';
import GreenChili from '@/assets/green-chili.png';
import GreenCucumber from '@/assets/green-cucumber.png';
import LadiesFinger from '@/assets/ladies-finger.png';
import LadiesFinger1 from '@/assets/ladies-finger-1.png';
import RedChilli from '@/assets/red-chili.png';
import RedTomato from '@/assets/red-tomato.png';


export default function Shop() {
  const products = [
    {
      id: 1,
      name: 'Potato',
      price: 4.99,
      rating: 4.5,
      image: Potato,
    },
    {
      id: 2,
      name: 'Fresh Capsicum',
      price: 3.99,
      rating: 4.2,
      image: Capsicum,
    },
    {
      id: 3,
      name: 'Chanise Cabbage',
      price: 2.99,
      rating: 4.8,
      image: ChaniseCabbage,
    },
    {
      id: 4,
      name: 'Green Lettuce',
      price: 4.99,
      rating: 4.5,
      image: GreenLettuce,
    },
    {
      id: 5,
      name: 'Eggplant',
      price: 3.99,
      rating: 4.2,
      image: Eggplant,
    },
    {
      id: 6,
      name: 'Fresh Cauliflower',
      price: 2.99,
      rating: 4.8,
      image: FreshCauliflower,
    },
    {
      id: 7,
      name: 'Fresh Mango',
      price: 4.99,
      rating: 4.5,
      image: FreshMango,
    },
    {
      id: 8,
      name: 'Green Apple',
      price: 3.99,
      rating: 4.2,
      image: GreenApple,
    },
    {
      id: 9,
      name: 'Green Capsicum',
      price: 2.99,
      rating: 4.8,
      image: GreenCapsicum,
    },
    {
      id: 10,
      name: 'Green Chili',
      price: 4.99,
      rating: 4.5,
      image: GreenChili,
    },
    {
      id: 11,
      name: 'Green Cucumber',
      price: 3.99,
      rating: 4.2,
      image: GreenCucumber,
    },
    {
      id: 12,
      name: 'Ladies Finger',
      price: 2.99,
      rating: 4.8,
      image: LadiesFinger,
    },
    {
      id: 13,
      name: 'Ladies Finger',
      price: 4.99,
      rating: 4.5,
      image: LadiesFinger1,
    },
    {
      id: 14,
      name: 'Red Chilli',
      price: 3.99,
      rating: 4.2,
      image: RedChilli,
    },
    {
      id: 15,
      name: 'Red Tomato',
      price: 2.99,
      rating: 4.8,
      image: RedTomato,
    },
  ];

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
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
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
          {products.map((product) => (
            <Card key={product.id} className="group">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover rounded-lg w-full h-full"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    +
                  </Button>
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
