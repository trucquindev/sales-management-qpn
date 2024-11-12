import { useParams } from '@/router';
import {
  CalendarDays,
  Clock,
  MessageCircle,
  ThumbsUp,
  User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export default function BlogDetail() {
  const { blogId } = useParams('/blog/:blogId');

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <img
          src={`https://picsum.photos/seed/${blogId + 10}/400/300`}
          alt="Creative portfolio item"
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <h1 className="text-4xl font-bold mb-4">
          The Art of Sustainable Living: A Comprehensive Guide
        </h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>John Doe</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>May 20, 2024</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>10 min read</span>
          </div>
        </div>
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Sustainable living has become more than just a trend; it's a
            necessity in our rapidly changing world. This comprehensive guide
            delves into the various aspects of sustainable living, offering
            practical tips and insights for those looking to reduce their
            environmental impact and live more harmoniously with nature.
          </p>
          <h2>Understanding Sustainability</h2>
          <p>
            At its core, sustainability is about meeting our present needs
            without compromising the ability of future generations to meet
            theirs. This concept encompasses environmental, social, and economic
            dimensions, all of which are interconnected and vital for long-term
            well-being.
          </p>
          <h2>Key Areas of Sustainable Living</h2>
          <ul>
            <li>
              <strong>Energy Conservation:</strong> Implementing
              energy-efficient practices and transitioning to renewable energy
              sources.
            </li>
            <li>
              <strong>Waste Reduction:</strong> Adopting a zero-waste lifestyle
              through recycling, composting, and mindful consumption.
            </li>
            <li>
              <strong>Sustainable Transportation:</strong> Opting for
              eco-friendly modes of transport and reducing carbon emissions.
            </li>
            <li>
              <strong>Ethical Consumption:</strong> Making informed choices
              about products and supporting environmentally responsible
              companies.
            </li>
          </ul>
          <p>
            By incorporating these principles into our daily lives, we can
            significantly reduce our ecological footprint and contribute to a
            more sustainable future for all.
          </p>
        </div>
        <Separator className="my-8" />
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold">Jane Smith</h3>
                  <p className="text-sm text-muted-foreground">May 22, 2024</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                This article provides a great overview of sustainable living. I
                especially appreciated the practical tips on energy
                conservation. It's inspiring to see how small changes can make a
                big difference!
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="mr-2">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Reply
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold">Mike Davis</h3>
                  <p className="text-sm text-muted-foreground">May 23, 2024</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                I've been trying to live more sustainably, and this guide is
                exactly what I needed. The section on ethical consumption was
                particularly eye-opening. Thanks for sharing such valuable
                information!
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="mr-2">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Reply
              </Button>
            </CardFooter>
          </Card>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
          <Card>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Write your comment here..."
                className="mb-4"
              />
              <Button>Post Comment</Button>
            </CardContent>
          </Card>
        </section>
      </article>
    </div>
  );
}
