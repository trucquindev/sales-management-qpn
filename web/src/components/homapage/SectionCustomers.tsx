import { Card, CardContent } from '@/components/ui/card';
import imageCustomer from '@/assets/images/imageCustomer/image.png';
import { Star } from 'lucide-react';
const testimonials = [
  {
    name: 'Alex Johnson',
    text: "The quality of organic produce is amazing. I'm a regular customer now!",
    avatar: imageCustomer,
  },
  {
    name: 'Sarah Williams',
    text: 'Great selection of fresh vegetables. The delivery is always on time.',
    avatar: imageCustomer,
  },
  {
    name: 'Mike Brown',
    text: 'Best organic store in the area. Highly recommended for fresh fruits.',
    avatar: imageCustomer,
  },
];
const SectionCustomers = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Client Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div className="flex justify-between items-center gap-4">
                  <div className="relative flex items-center gap-2">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-full object-cover w-12 h-12"
                    />
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-slate-400">Customer</p>
                    </div>
                  </div>

                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionCustomers;
