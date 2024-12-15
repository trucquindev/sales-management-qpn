import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getAllCategoryAPI } from '@/apis';
import * as xmljs from 'xml-js';

interface category {
  name: string;
  image: string;
}
const SectionCategories = () => {
  const [category, setCategory] = useState<category[]>([]);
  const fetchData = async () => {
    try {
      const response = await getAllCategoryAPI(); // Gọi API để lấy dữ liệu
      const xmlData = response.data; // response.data là chuỗi XML
      console.log('🚀 ~ fetchData ~ xmlData:', xmlData);
      // console.log('🚀 ~ raw XML data:', xmlData);

      // Chuyển đổi XML sang JSON
      const jsonData = xmljs.xml2js(xmlData, { compact: true });
      // console.log('🚀 ~ parsed JSON:', jsonData);
      // Tiến hành xử lý dữ liệu
      const categories = jsonData.result?.name.map(
        (category: any, index: number) => ({
          name: category._text,
          image: jsonData.result?.image[index]._text,
        })
      );

      // console.log('Categories:', categories);
      setCategory(categories); // Lưu vào state để hiển thị
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
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
