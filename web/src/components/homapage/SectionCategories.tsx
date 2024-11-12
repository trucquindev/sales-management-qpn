import { Card, CardContent } from '@/components/ui/card';
import image1 from '@/assets/images/imageCategories/image-1.png';
import image2 from '@/assets/images/imageCategories/image-2.png';
import image3 from '@/assets/images/imageCategories/image-3.png';
import image4 from '@/assets/images/imageCategories/image-4.png';
import image5 from '@/assets/images/imageCategories/image-5.png';
import image6 from '@/assets/images/imageCategories/image-6.png';
import image7 from '@/assets/images/imageCategories/image-7.png';
import image8 from '@/assets/images/imageCategories/image-8.png';
import image9 from '@/assets/images/imageCategories/image-9.png';
import image10 from '@/assets/images/imageCategories/image-10.png';
import image11 from '@/assets/images/imageCategories/image-11.png';
import image12 from '@/assets/images/imageCategories/image-12.png';
const categories = [
  { name: 'Fresh Fruit', icon: image1 },
  { name: 'Fresh Vegetables', icon: image2 },
  { name: 'Meat & Fish', icon: image3 },
  { name: 'Snacks', icon: image4 },
  { name: 'Beverages', icon: image5 },
  { name: 'Beauty & Health', icon: image6 },
  { name: 'Bread & Bakery', icon: image7 },
  { name: 'Baking Needs', icon: image8 },
  { name: 'Cooking', icon: image9 },
  { name: 'Diabetic Food', icon: image10 },
  { name: 'Dish Detergents', icon: image11 },
  { name: 'Oil', icon: image12 },
];
const SectionCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex w-[90%] flex-wrap justify-center items-center">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="border-none gap-4 shadow-none"
              >
                <CardContent className="flex flex-col items-center p-4">
                  <div className="w-40 h-40 rounded-lg bg-white shadow-md flex items-center justify-center mb-2">
                    <img
                      src={category.icon}
                      alt={category.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <span className="text-sm text-center">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCategories;
