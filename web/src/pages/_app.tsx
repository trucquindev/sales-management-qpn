import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footers from '@/components/footer/Footer';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchIntervalInBackground: false,
//       refetchOnWindowFocus: false,
//       retry: false,
//     },
//   },
// });

export default function Layout() {
  return (
    <div className="mx-auto">
      <Header />
      <Outlet />
      <Footers />
    </div>
  );
}
