import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PackageCheck, Clock, ArrowRight, Truck, CheckCircle2, Box } from 'lucide-react';

export default function OrdersPage() {
  const orders = useSelector((state) => state.orders?.orders || []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <PackageCheck className="w-4 h-4" /> Account Dashboard
        </span>
        <h1 className="text-3xl font-extrabold text-white">Your Order History</h1>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/60 max-w-lg mx-auto">
          <Box className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-1">No Orders Yet</h3>
          <p className="text-slate-400 text-xs mb-6">
            You haven't placed any orders yet. Explore our products and checkout using our remote cart app!
          </p>
          <NavLink
            to="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-indigo-600/20"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-lg space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-mono block">
                    Order ID: <strong className="text-indigo-400">{order.id}</strong>
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" /> Placed on{' '}
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}
                  >
                    {order.status === 'Delivered' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Truck className="w-3.5 h-3.5" />
                    )}
                    {order.status}
                  </span>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Total</span>
                    <span className="text-lg font-extrabold text-white">
                      ${order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Items Included
                  </h4>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                        <p className="text-[11px] text-slate-400">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Details */}
                <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    Shipping & Payment Info
                  </h4>
                  <p className="text-white font-semibold">{order.shippingAddress?.fullName}</p>
                  <p className="text-slate-400">{order.shippingAddress?.address}</p>
                  <p className="text-slate-400">
                    {order.shippingAddress?.city}, {order.shippingAddress?.zip}
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-indigo-400 font-medium">
                    Payment: {order.shippingAddress?.paymentMethodName || 'Credit Card'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
