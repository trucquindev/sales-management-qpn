import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Users, ShoppingCart, DollarSign } from 'lucide-react';

export function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export function DashboardWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} />
      <StatCard title="New Customers" value="+2350" icon={Users} />
      <StatCard title="Sales" value="+12,234" icon={ShoppingCart} />
      <StatCard title="Active Users" value="+573" icon={BarChart2} />
    </div>
  );
}
