import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

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
    <div className="w-screen mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}
