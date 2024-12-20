import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllCategoryAPI, getAllProductAPI } from '@/apis/shop/product';
import * as xmljs from 'xml-js';
const SectionProducts = () => {
  const [isProduct, setIsProduct] = useState<
    {
      id: string;
      name: string;
      price: number;
      rating: number;
      image: string;
      star: string;
    }[]
  >([]);
  const fetchData = async () => {
    try {
      const responseCategory = await getAllCategoryAPI();

      const responseProduct = await getAllProductAPI();

      const xmlData = responseProduct.data;

      const jsonData = xmljs.xml2js(xmlData, { compact: true });

      const transformData = (data: any) => {
        return data.map((item: any) => ({
          id: item.id._text,
          image: item.image._text,
          name: item.name._text,
          price: parseFloat(item.price._text),
          star: parseInt(item.star._text, 10),
        }));
      };
      const result = transformData(jsonData.result.item);

      setIsProduct(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fillStar = (starCount: number) => {
    return Array.from({ length: starCount }, (_, i) => (
      <Star className="h-5 w-5 text-yellow-500 fill-primary" key={i} />
    ));
  };
  return (
    <div className="relative">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Popular Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {isProduct.slice(0, 10).map((product) => (
              <Card
                key={product.name}
                className="overflow-hidden hover:scale-105 hover:shadow-2xl"
              >
                <CardContent className="p-4">
                  <div className="relative h-40 mb-4 flex items-center justify-center">
                    <img
                      src={`src/assets/images/imageProducts/${product.image}`}
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
                      <div className="flex ">{fillStar(+product.star!)}</div>
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
