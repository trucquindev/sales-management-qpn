import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getAllCategoryAPI } from '@/apis';
interface category {
  name:string;
  image :string;
}
const SectionCategories = () => {
  const [category, setCategory] = useState<category[]>([])
  const fetchData = async () => {
    try {
      const response = await getAllCategoryAPI();
      setCategory(response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData(); 
  }, []); 
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex w-[90%] flex-wrap justify-center items-center">
            {category.map((category) => (
              <Card
                key={category.name}
                className="border-none gap-4 shadow-none hover:scale-105 hover:shadow-2xl"
              >
                <CardContent className="flex flex-col items-center p-4">
                  <div className="w-40 h-40 rounded-lg bg-white shadow-md flex items-center justify-center mb-2">
                    <img
                      src={`src/assets/images/imageCategories/${category.image}`}
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
