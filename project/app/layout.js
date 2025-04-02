'use client'; // Client component due to Redux

import { Provider } from 'react-redux';
import store from '@/redux/store';
import Navbar from '@/components/Navbar';
import NotificationToast from '@/components/NotificationToast';
import './globals.css';

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">
        <Provider store={store}>
          <Navbar />
          <main>{children}</main>
          <NotificationToast />
        </Provider>
      </body>
    </html>
  );
}