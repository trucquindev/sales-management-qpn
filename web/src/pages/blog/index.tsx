import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/router';
import { ChevronRight, Heart } from 'lucide-react';

export default function ImageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] h-screen">
      <div className="border-r">
        <ScrollArea className="h-screen px-4 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="text-lg font-semibold">Gallery</span>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="mb-2 text-lg font-semibold">Top Categories</h2>
                <div className="space-y-2">
                  {[
                    'Fresh Fruit',
                    'Vegetables',
                    'Citrus',
                    'Berries',
                    'Tropical',
                  ].map((category) => (
                    <a
                      key={category}
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary"
                      href="/category"
                    >
                      {category}
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h2 className="mb-2 text-lg font-semibold">Popular Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {['organic', 'fresh', 'healthy', 'natural', 'seasonal'].map(
                    (tag) => (
                      <Button key={tag} variant="secondary" size="sm">
                        {tag}
                      </Button>
                    )
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <h2 className="mb-2 text-lg font-semibold">Recently Added</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={`https://picsum.photos/seed/${i}/100/100`}
                        alt="Recently added item"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="h-screen overflow-auto">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Link
                to={`/blog/${i.toString()}`}
                key={`item-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  i
                }`}
                className="group relative space-y-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={`https://picsum.photos/seed/${i + 10}/400/300`}
                    alt="Creative portfolio item"
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <div className="absolute right-2 top-2">
                    <Button size="icon" variant="secondary">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium leading-none">
                    Creative portfolio you might image
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted" />
                  <div className="grid gap-0.5 text-sm">
                    <span className="font-medium">Studio Name</span>
                    <span className="text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
