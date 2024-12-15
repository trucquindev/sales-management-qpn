import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footers from '@/components/footer/Footer';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';
const persistor = persistStore(store);
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="mx-auto w-[100%]">
          <Header/>
          <Outlet />
          <Footers />
        </div>
        <ToastContainer/>
      </PersistGate>
    </Provider>
  );
}
