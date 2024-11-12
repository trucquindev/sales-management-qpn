import { Outlet } from 'react-router-dom';

import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="w-screen text-lg overflow-x-hidden relative">
      <Outlet />
    </div>
  );
}
