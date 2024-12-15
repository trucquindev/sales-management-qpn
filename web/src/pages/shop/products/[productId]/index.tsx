import { Star, Minus, Plus, ShoppingCart, Heart, Facebook, Twitter, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import image from '@/assets/images/imageProducts/image.png'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDetailCategoryAPI, getDetailProductAPI } from '@/apis'
interface Review {
  id: string
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
}
const reviews: Review[] = [
  {
    id: "1",
    name: "Kristin Watson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 min ago",
    comment: "Duis at ullamcorper nulla, eu dictum eros."
  },
  {
    id: "2",
    name: "Jane Cooper",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "30 Apr, 2021",
    comment: "Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to \"bolt\" or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants."
  },
  {
    id: "3",
    name: "Jacob Jones",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 min ago",
    comment: "Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus."
  },
  {
    id: "4",
    name: "Ralph Edwards",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 min ago",
    comment: "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA"
  }
]

function StarRating({ rating }: { rating: number }) {
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}
interface Product {
  id: string;  
  name: string;     
  title: string;     
  image: string[];       
  start: number;     
  description: string;   
  price: number;      
  sku: number;        
  _Destroy: boolean;       
  categoryId: string;      
  reviews: any[];          
}
interface Category {
  id:string;
  name:string;
  image:string;
}
export default function ProductPage() {
  const [dataDetail, setDataDetail] = useState<Product>()
  const [category, setCategory] = useState<Category>()
  let params = useParams()
  let productId :string|undefined = params.productId
  const fetchData = async () => {
    try {
      const response = await getDetailProductAPI(productId);
      const responseCategory = await getDetailCategoryAPI(response.product.categoryId);
      
      setCategory(responseCategory.category);
      setDataDetail(response.product);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [productId]);
  console.log('prduct detail ~',dataDetail);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex">
          <div className="w-20 mr-4">
            {dataDetail?.image.map((i) => {
              console.log(i);
              
              return (
                <div key={i} className="mb-4">
                  <img
                    src={`/images/imageProducts/${i}`}
                    alt={`Thumbnail ${i}`}
                    width={80}
                    height={80}
                    className="rounded-md border border-gray-200"
                  />
                </div>
              )
            })}
          </div>
          <div className="flex-grow">
            <img
              src={`/images/imageProducts/${dataDetail?.image[0]}`}
              alt="Chinese Cabbage"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{dataDetail?.title}</h1>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">In Stock</span>
          </div>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-sm text-gray-500 ml-2">{dataDetail?.reviews.length} reviews</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold mr-2">${dataDetail?.price}</span>
            <span className="text-lg text-gray-500 line-through">${(dataDetail?.price || 0)*2}</span>
            <span className="ml-2 text-red-500">50% Off</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Brand:</span> Acme
          </div>
          <p className="text-gray-600 mb-4">
           {dataDetail?.description}
          </p>
          <div className="flex items-center mb-4">
            <Button variant="outline" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4">1</span>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-4 mb-4">
            <Button className="flex-grow">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-4 mb-4">
            <Facebook className="h-5 w-5" />
            <Twitter className="h-5 w-5" />
            <Instagram className="h-5 w-5" />
          </div>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {category?.name}
          </div>
          <div>
            <span className="font-semibold">Tags:</span> Vegetables, Healthy, Chinese, Cabbage, Green Cabbage
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Tabs defaultValue="description" className="mt-8">
          <div className='w-full flex justify-center items-center'>
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="additional">Additional Information</TabsTrigger>
              <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="description">
            <div className='flex justify-center items-center'>
              <div className='w-1/2'>
                <p className="text-gray-600">
                  {dataDetail?.description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <img src={image} alt="" />
                </div>
               <div className='flex justify-center items-center gap-10 border p-4'>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <ShoppingCart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">64% Discount</h3>
                      <p className="text-sm text-gray-600">Save your 64% money with us</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">100% Organic</h3>
                      <p className="text-sm text-gray-600">100% Organic Vegetables</p>
                    </div>
                  </div>
               </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="additional">
            <div className='flex'>
              <div className='w-1/2 flex items-start gap-6'>
                <ul className="list-inside mt-4 space-y-2 list-none">
                  <li>Weight:</li>
                  <li>Color:</li>
                  <li>Type:</li>
                  <li>Category:</li>
                  <li>Stock Status:</li>
                  <li>Tags:</li>
                </ul>
                <ul className="list-inside mt-4 space-y-2 list-none">
                  <li>03</li>
                  <li>Green</li>
                  <li>Organic</li>
                  <li>Vegetables</li>
                  <li>Available (5,413)</li>
                  <li>Vegetables, Healthy, Chinese, Cabbage</li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <img src={image} alt="" />
                </div>
                <div className='flex justify-center items-center gap-10 border p-4'>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <ShoppingCart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">64% Discount</h3>
                      <p className="text-sm text-gray-600">Save your 64% money with us</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">100% Organic</h3>
                      <p className="text-sm text-gray-600">100% Organic Vegetables</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="feedback">
            <div className="max-w-2xl mx-auto p-4 space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`flex space-x-4 p-4 rounded-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <div className='w-10 h-10'>
                    <img
                      src={image}
                      alt={`${review.name}'s avatar`}
                      className="rounded-full w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                </div>
              ))}
              <button type="button" className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Load More
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}