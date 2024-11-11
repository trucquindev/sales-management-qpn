import { Outlet } from 'react-router-dom';
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
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
