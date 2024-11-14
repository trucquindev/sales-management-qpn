import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import image1 from '@/assets/images/imageProducts/image-1.png';
import image2 from '@/assets/images/imageProducts/image-2.png';
import image3 from '@/assets/images/imageProducts/image-3.png';
import image4 from '@/assets/images/imageProducts/image-4.png';
import image5 from '@/assets/images/imageProducts/image-5.png';
import image6 from '@/assets/images/imageProducts/image-6.png';
import image7 from '@/assets/images/imageProducts/image-7.png';
import image8 from '@/assets/images/imageProducts/image-8.png';
import image9 from '@/assets/images/imageProducts/image-9.png';
import image10 from '@/assets/images/imageProducts/image-10.png';
import { ShoppingBasket, Star } from 'lucide-react';
const products = [
  {
    name: 'Green Apple',
    price: '4.99',
    image: image1,
    star: 5,
  },
  {
    name: 'Fresh Indian Malta',
    price: '3.99',
    image: image2,
    star: 5,
  },
  {
    name: 'Chinese cabbage',
    price: '2.99',
    image: image3,
    star: 1,
  },
  {
    name: 'Green Lettuce',
    price: '1.99',
    image: image4,
    star: 5,
  },
  {
    name: 'Eggplant',
    price: '3.49',
    image: image5,
    star: 2,
  },
  {
    name: 'Big Potatoes',
    price: '4.99',
    image: image6,
    star: 5,
  },
  {
    name: 'Corn',
    price: '3.99',
    image: image7,
    star: 5,
  },
  {
    name: 'Fresh Cauliflower',
    price: '2.99',
    image: image8,
    star: 4,
  },
  {
    name: 'Green Capsicum',
    price: '1.99',
    image: image9,
    star: 2,
  },
  {
    name: 'Green Chili',
    price: '3.49',
    image: image10,
    star: 4,
  },
];
const SectionProducts = () => {
  const fillStar = (starCount: number) => {
    return Array.from({ length: starCount }, (_, i) => (
      <Star className="h-5 w-5 text-yellow-500 fill-primary" key={i} />
    ));
  };
  return (
    <div className='relative'>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Popular Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Card key={product.name} className="overflow-hidden hover:scale-105 hover:shadow-2xl">
                <CardContent className="p-4">
                  <div className="relative h-40 mb-4 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-600 font-bold">
                        ${product.price}
                      </span>
                      <div className="flex ">{fillStar(product.star!)}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ShoppingBasket className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionProducts;
