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
    <div className="flex h-screen">
      <Outlet />
    </div>
  );
}
