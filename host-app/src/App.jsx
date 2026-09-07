import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import { addOrder } from './store/ordersSlice.js';
import { Sparkles, Layers, AlertCircle, ShoppingBag } from 'lucide-react';

// Lazy load remote Cart component from remoteApp MFE
const RemoteCartPage = lazy(() =>
  import('remoteApp/CartPage').catch((err) => {
    console.error('Failed to load remote CartPage MFE:', err);
    return {
      default: () => (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-rose-500/30 max-w-xl mx-auto my-12 p-8">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Remote Cart Micro Frontend Unavailable</h2>
          <p className="text-slate-400 text-xs mb-6">
            Make sure the Remote App is running on <code className="text-indigo-400">http://localhost:5001</code> and built with Vite federation.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
          >
            Return to Front Page
          </a>
        </div>
      )
    };
  })
);

// Lazy load remote Auth component from authApp MFE
const RemoteLoginPage = lazy(() =>
  import('authApp/LoginPage').catch((err) => {
    console.error('Failed to load remote LoginPage MFE:', err);
    return {
      default: () => (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-rose-500/30 max-w-xl mx-auto my-12 p-8">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Remote Auth Micro Frontend Unavailable</h2>
          <p className="text-slate-400 text-xs mb-6">
            Make sure the Auth App is running on <code className="text-indigo-400">http://localhost:5002</code> and built with Vite federation.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
          >
            Return to Front Page
          </a>
        </div>
      )
    };
  })
);

export default function App() {
  const dispatch = useDispatch();

  const handleOrderPlaced = (orderData) => {
    dispatch(addOrder(orderData));
  };

  return (
    <div className="min-h-screen bg-[#1e212d] text-[#E5EAF5] font-sans flex flex-col justify-between selection:bg-[#8458B3] selection:text-white">
      <div>
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/cart"
              element={
                <Suspense
                  fallback={
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                      <div className="w-12 h-12 border-4 border-[#8458B3] border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-semibold text-[#D0BDF4] flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#A0D2EB] animate-bounce" /> Loading Remote Cart Micro Frontend...
                      </p>
                    </div>
                  }
                >
                  <RemoteCartPage onOrderPlaced={handleOrderPlaced} />
                </Suspense>
              }
            />
            <Route path="/orders" element={<OrdersPage />} />
            <Route
              path="/auth"
              element={
                <Suspense
                  fallback={
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                      <div className="w-12 h-12 border-4 border-[#8458B3] border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-semibold text-[#D0BDF4] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#A0D2EB] animate-bounce" /> Loading Remote Auth Micro Frontend...
                      </p>
                    </div>
                  }
                >
                  <RemoteLoginPage />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#D0BDF4]/20 bg-[#494D5F]/80 py-8 px-4 text-center text-xs text-[#E5EAF5]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#A0D2EB]" />
            <span>Micro Frontend Architecture &bull; Vite + React + Redux Toolkit</span>
          </div>
          <p>&copy; {new Date().getFullYear()} NEOSTORE Micro Frontend Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}