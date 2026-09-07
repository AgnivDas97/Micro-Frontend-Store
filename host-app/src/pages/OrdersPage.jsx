import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PackageCheck, Clock, ArrowRight, Truck, CheckCircle2, Box } from 'lucide-react';

export default function OrdersPage() {
  const orders = useSelector((state) => state.orders?.orders || []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-slide-up text-left">
      {/* Header */}
      <div className="border-b border-[#D0BDF4]/20 pb-6">
        <span className="text-xs font-extrabold text-[#A0D2EB] uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <PackageCheck className="w-4 h-4" /> Order History
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#E5EAF5] font-heading">Your Past Orders</h1>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-20 clean-card rounded-3xl max-w-lg mx-auto space-y-4">
          <Box className="w-14 h-14 text-[#A0D2EB] mx-auto" />
          <div>
            <h3 className="text-xl font-extrabold text-[#E5EAF5] font-heading">No Active Orders Found</h3>
            <p className="text-[#D0BDF4] text-xs mt-1 max-w-xs mx-auto">
              Your order history is empty. Explore our live catalog and place your first order using the Remote Cart MFE!
            </p>
          </div>
          <NavLink
            to="/products"
            className="inline-flex items-center gap-2 btn-gradient font-extrabold px-6 py-3.5 rounded-2xl text-xs cursor-pointer"
          >
            Start Shopping Now <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="clean-card rounded-3xl p-6 sm:p-8 space-y-6 text-[#E5EAF5]"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D0BDF4]/20 pb-4">
                <div>
                  <span className="text-xs text-[#D0BDF4] font-mono block">
                    Order ID: <strong className="text-[#A0D2EB] font-bold">{order.id}</strong>
                  </span>
                  <span className="text-xs text-[#D0BDF4]/80 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#A0D2EB]" /> Placed on{' '}
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${
                      order.status === 'Delivered'
                        ? 'bg-[#8458B3]/30 text-[#A0D2EB] border-[#8458B3]'
                        : 'bg-[#8458B3]/20 text-[#D0BDF4] border-[#8458B3]/40'
                    }`}
                  >
                    {order.status === 'Delivered' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#A0D2EB]" />
                    ) : (
                      <Truck className="w-4 h-4 text-[#A0D2EB]" />
                    )}
                    {order.status}
                  </span>

                  <div className="text-right">
                    <span className="text-xs text-[#D0BDF4] block">Total Amount</span>
                    <span className="text-xl font-black text-[#A0D2EB] font-heading">
                      ${order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-[#D0BDF4] uppercase tracking-wider">
                    Purchased Items ({order.items.length})
                  </h4>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-[#141622] p-3 rounded-2xl border border-[#D0BDF4]/20"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#D0BDF4]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-[#E5EAF5] truncate">{item.name}</h5>
                        <p className="text-[11px] text-[#A0D2EB] font-bold">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Details */}
                <div className="bg-[#141622] p-5 rounded-2xl border border-[#D0BDF4]/20 space-y-2 text-xs">
                  <h4 className="font-extrabold text-[#D0BDF4] uppercase tracking-wider text-[11px]">
                    Shipping & Payment Details
                  </h4>
                  <p className="text-[#E5EAF5] font-bold text-sm">{order.shippingAddress?.fullName}</p>
                  <p className="text-[#D0BDF4]">{order.shippingAddress?.address}</p>
                  <p className="text-[#D0BDF4]">
                    {order.shippingAddress?.city}, {order.shippingAddress?.zip}
                  </p>
                  <div className="pt-3 border-t border-[#D0BDF4]/20 text-[#A0D2EB] font-bold">
                    Payment Option: {order.shippingAddress?.paymentMethodName || 'Credit Card'}
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
