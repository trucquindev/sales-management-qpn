import Sidebar from './components/siderbar';
import { Outlet } from 'react-router-dom';
export default function AdminLayout() {
  return (
    <div className="h-[590px]">
      <div className="flex  h-full bg-gray-100">
        <main className="flex flex-row h-full overflow-x-hidden overflow-y-auto bg-gray-100">
          <Sidebar />
          <div className="container mx-auto px-6 py-8 h-full w-full">
            <Outlet />
          </div>
        </main>
        {/* </div> */}
      </div>
    </div>
  );
}
