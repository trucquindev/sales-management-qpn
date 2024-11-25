import HeaderHomepageDetails from '@/components/homapage/HeaderHomepageDetails';
import SectionCategories from '@/components/homapage/SectionCategories';
import SectionProducts from '@/components/homapage/SectionProducts';
import { Button } from '@/components/ui/button';
import image1 from '@/assets/images/imagePromos/image-1.png';
import image2 from '@/assets/images/imagePromos/image-2.png';
import image3 from '@/assets/images/imagePromos/image-3.png';
import CountdownTimer from '@/lib/CountdownTimer';
import SectionCustomers from '@/components/homapage/SectionCustomers';

import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import image4 from '@/assets/images/imageInstagram/image-1.png';
import image5 from '@/assets/images/imageInstagram/image-2.png';
import image6 from '@/assets/images/imageInstagram/image-3.png';
import image7 from '@/assets/images/imageInstagram/image-4.png';
import image8 from '@/assets/images/imageInstagram/image-5.png';
import image9 from '@/assets/images/imageInstagram/image-6.png';
import image10 from '@/assets/images/imageProducts/image-1.png';
import image11 from '@/assets/images/imageProducts/image-2.png';
import image12 from '@/assets/images/imageProducts/image-3.png';
import image13 from '@/assets/images/imageProducts/image-4.png';
import image14 from '@/assets/images/imageProducts/image-5.png';
import image15 from '@/assets/images/imageProducts/image-6.png';
const brands = [
  { name: 'Steps', image: image4 },
  { name: 'Mango', image: image5 },
  { name: 'Food', image: image6 },
  { name: 'Food 2', image: image7 },
  { name: 'Book Off', image: image8 },
  { name: 'G Series', image: image9 },
];

const instagramPosts = [
  {
    image: image10,
    alt: 'Fresh tomatoes on dark background',
    href: '#',
  },
  {
    image: image11,
    alt: 'Green leafy texture',
    href: '#',
  },
  {
    image: image12,
    alt: 'Cucumber with water droplets',
    href: '#',
  },
  {
    image: image13,
    alt: 'Dark photo of vegetables',
    href: '#',
  },
  {
    image: image14,
    alt: 'Fresh green salad leaves',
    href: '#',
  },
  {
    image: image15,
    alt: 'Water splash with citrus',
    href: '#',
  },
];

const promos = [
  {
    title: 'Sale of the Month',
    image: image1,
  },
  { title: 'Lean-Fed Meat', image: image2, fatfree: 85, startAtMoney: 70.9 },
  { title: '100% Fresh Fruit', image: image3 },
];
export default function Component() {
  const targetDate = new Date('2024-12-31T23:59:59');
  return (
    <div>
      <HeaderHomepageDetails />
      {/* Categories */}
      <SectionCategories />
      {/* Products Grid */}
      <SectionProducts />
      <section className="py-12 bg-white">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.title}
              className="relative h-[600px] rounded-lg overflow-hidden"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className=" object-constrain w-full h-full"
              />
              {promo.title === 'Sale of the Month' && (
                <div className="absolute top-10 w-full p-6 flex justify-around">
                  <CountdownTimer targetDate={targetDate} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 p-6 flex flex-col justify-end">
                {promo.fatfree && (
                  <h4 className="text-center text-white font-semibold">
                    85% DAT FREE
                  </h4>
                )}
                <h3 className="text-white font-bold text-4xl mb-2 text-center">
                  {promo.title}
                </h3>
                {promo.startAtMoney && (
                  <h4 className="text-center text-white text-xl mb-2">
                    Start At{' '}
                    <span className="text-yellow-400">
                      ${promo.startAtMoney}
                    </span>
                  </h4>
                )}
                <Button variant="secondary" className="hover:bg-primary">
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionCustomers />

      {/* instagramPostsComponent */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Brands */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {brands.map((brand, index) => (
              <img
                key={index}
                src={brand.image}
                alt={brand.name}
                width={100}
                height={40}
                className="h-10 w-auto opacity-50 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>

          {/* Instagram Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">
              Follow us on Instagram
            </h2>
            <div className="grid grid-cols-6 md:grid-cols-6 gap-4">
              {instagramPosts.map((post, index) => (
                <Link
                  key={index}
                  to={post.href}
                  className="relative group aspect-square overflow-hidden bg-gray-100 rounded-lg"
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
