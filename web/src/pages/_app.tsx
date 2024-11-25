import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
<<<<<<< HEAD
=======
import Footers from '@/components/footer/Footer';
>>>>>>> ff3ea9077b66c4cb3cbfade532e4c269017a226b

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
<<<<<<< HEAD
    <div className=" m-w-2xl mx-auto">

=======
    <div className="mx-auto">
      <Header />
>>>>>>> ff3ea9077b66c4cb3cbfade532e4c269017a226b
      <Outlet />
      <Footers />
    </div>
  );
}
