import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, ShoppingCart, Settings, Menu } from 'lucide-react';

const menuItems = [
  { icon: BarChart2, name: 'Dashboard', href: '/admin' },
  { icon: Users, name: 'Users', href: '/admin/users' },
  { icon: ShoppingCart, name: 'Products', href: '/admin/products' },
  { icon: Settings, name: 'Settings', href: '/admin/settings' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`bg-black border h-full text-white transition-all duration-300 ease-in-out ${
        expanded ? 'w-64' : 'w-20'
      }`}
      style={{ backgroundColor: 'gray' }}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className={cn('font-bold text-xl', !expanded && 'hidden')}>
          Admin
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link key={item.name} to={item.href}>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start px-4 py-2 text-left',
                location.pathname === item.href && 'bg-gray-900',
                !expanded && 'justify-center px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 mr-2', !expanded && 'mr-0')} />
              {expanded && <span>{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
