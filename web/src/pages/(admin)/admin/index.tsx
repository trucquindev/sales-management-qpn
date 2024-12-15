import { DashboardWidgets } from './components/dashboard-widgets';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardWidgets />
      {/* Add more dashboard content here */}
    </div>
  );
}
