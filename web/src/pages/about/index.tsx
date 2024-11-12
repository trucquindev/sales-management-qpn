import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Leaf, ShieldCheck, Truck, Users } from 'lucide-react';

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="container grid lg:grid-cols-2 gap-8 items-center py-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            100% Trusted Organic Food Store
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            We provide fresh organic produce directly from local farmers to your
            table. Our commitment to quality ensures you receive the best nature
            has to offer.
          </p>
        </div>
        <div className="relative h-[400px]">
          <img
            alt="Farmer with fresh produce"
            className="rounded-lg object-cover"
            src="/placeholder.svg?height=400&width=600"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          100% Trusted Organic Food Store
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 space-y-2">
              <ShieldCheck className="w-12 h-12 text-green-600" />
              <h3 className="font-semibold">100% Secure Payment</h3>
              <p className="text-sm text-gray-500">
                Safe and secure payments for all your transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-2">
              <Leaf className="w-12 h-12 text-green-600" />
              <h3 className="font-semibold">100% Organic Food</h3>
              <p className="text-sm text-gray-500">
                Fresh and certified organic produce
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-2">
              <Truck className="w-12 h-12 text-green-600" />
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-gray-500">
                Free delivery on all orders over $50
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-2">
              <Users className="w-12 h-12 text-green-600" />
              <h3 className="font-semibold">24/7 Support Team</h3>
              <p className="text-sm text-gray-500">Always here to help you</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="container grid lg:grid-cols-2 gap-8 items-center py-12">
        <div className="relative h-[400px] lg:order-last">
          <img
            alt="Delivery person with produce box"
            className="rounded-lg object-cover"
            
            src="/placeholder.svg?height=400&width=600"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">
            We Delivered, You Enjoy Your Order.
          </h2>
          <p className="text-gray-500">
            Experience hassle-free delivery of fresh organic produce right to
            your doorstep. Our efficient delivery system ensures your food
            arrives fresh and on time.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">Order Now</Button>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Awesome Team
        </h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {[1, 2, 3, 4].map((index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="p-0">
                      <div className="relative aspect-square">
                        <img
                          alt={`Team member ${index}`}
                          className="rounded-t-lg object-cover"
                          
                          src={`/placeholder.svg?height=300&width=300`}
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold">Team Member {index}</h3>
                        <p className="text-sm text-gray-500">Position</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Testimonials Section */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Client Testimonials
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    "The quality of organic produce I receive is consistently
                    excellent. Great service!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <img
                        alt={`Client ${index}`}
                        className="rounded-full object-cover"
                        
                        src={`/placeholder.svg?height=50&width=50`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Client Name</h4>
                      <p className="text-sm text-gray-500">Customer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer with Logos */}
      <footer className="border-t">
        <div className="container py-8">
          <div className="flex justify-center gap-8 flex-wrap">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="relative w-24 h-12">
                <img
                  alt={`Partner logo ${index}`}
                  className="object-contain"
                  
                  src={`/placeholder.svg?height=50&width=100`}
                />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
