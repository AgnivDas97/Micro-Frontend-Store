import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle,
  CreditCard,
  X,
  Sparkles,
  ShoppingBasket
} from 'lucide-react';
import {
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart
} from '../store/cartSlice';

export default function CartPage({ onOrderPlaced }) {
  const dispatch = useDispatch();
  const navigate = useNavigate ? useNavigate() : null;
  const { items, couponCode, discountPercent, couponError, couponSuccess } = useSelector(
    (state) => state.cart || { items: [], couponCode: '', discountPercent: 0 }
  );

  const [inputCoupon, setInputCoupon] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    address: '104 Innovation Way, Suite 400',
    city: 'San Francisco',
    zip: '94105',
    paymentMethod: 'card'
  });

  // Financial Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const shippingFee = subtotal > 100 || items.length === 0 ? 0 : 15.0;
  const taxAmount = subtotalAfterDiscount * 0.08;
  const grandTotal = subtotalAfterDiscount + shippingFee + taxAmount;

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    dispatch(applyCoupon(inputCoupon));
  };

  const handlePresetCoupon = (code) => {
    setInputCoupon(code);
    dispatch(applyCoupon(code));
  };

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      items: [...items],
      totalAmount: Number(grandTotal.toFixed(2)),
      subtotal: Number(subtotal.toFixed(2)),
      status: 'Processing',
      shippingAddress: {
        ...shippingInfo,
        paymentMethodName:
          shippingInfo.paymentMethod === 'card'
            ? 'Credit Card (**** 8829)'
            : shippingInfo.paymentMethod === 'paypal'
            ? 'PayPal Express'
            : 'Cash on Delivery'
      }
    };

    setPlacedOrderDetails(orderData);
    setIsOrderPlaced(true);
    setIsCheckoutOpen(false);

    if (onOrderPlaced) {
      onOrderPlaced(orderData);
    }

    // Clear cart after placement
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background ambient light */}
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* MFE Header Badge */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Remote Micro Frontend Cart
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-indigo-400" />
              Your Shopping Cart
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-900/50 bg-slate-900/50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 && !isOrderPlaced && (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800/60 backdrop-blur-sm max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 border border-slate-700/50 shadow-inner">
              <ShoppingBasket className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
              Looks like you haven't added any products to your cart yet. Explore our high-tech product catalog and add your favorites!
            </p>
            {navigate ? (
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {/* Main Grid: Items & Order Summary */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 transition-all shadow-md backdrop-blur-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0 relative border border-slate-700/50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.badge && (
                      <span className="absolute top-1.5 left-1.5 bg-indigo-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
                      {item.category || 'Gear'}
                    </span>
                    <h3 className="text-lg font-bold text-white truncate mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-xl p-1.5">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-8 text-center font-bold text-white text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Subtotal & Delete */}
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block sm:hidden">Total</span>
                      <span className="text-lg font-extrabold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-6">
              <h2 className="text-xl font-extrabold text-white pb-4 border-b border-slate-800">
                Order Summary
              </h2>

              {/* Coupon Section */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" /> Apply Promo Code
                </label>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter code (e.g. SAVE10)"
                    className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-sm text-white px-3.5 py-2.5 rounded-xl outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                  >
                    Apply
                  </button>
                </form>

                {/* Preset Promo Buttons */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[11px] text-slate-500">Quick codes:</span>
                  {['SAVE10', 'TECH20', 'SUPER50'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handlePresetCoupon(code)}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                        couponCode === code
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>

                {couponSuccess && (
                  <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-2 rounded-xl">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> {couponSuccess}
                    </span>
                    <button
                      onClick={() => dispatch(removeCoupon())}
                      className="text-emerald-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-t border-slate-800 pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    Shipping{' '}
                    {shippingFee === 0 && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-slate-200">
                    {shippingFee === 0 ? '$0.00' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-slate-200">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-indigo-400 text-xl">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL Secured</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-indigo-400" />
                  <span>Fast Global Delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Confirmation Screen */}
        {isOrderPlaced && placedOrderDetails && (
          <div className="my-10 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl backdrop-blur-xl text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-white">Order Confirmed!</h2>
              <p className="text-slate-400 text-sm mt-1">
                Thank you for your purchase. Your order ID is{' '}
                <span className="font-mono text-indigo-400 font-bold">
                  {placedOrderDetails.id}
                </span>
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 text-left text-sm space-y-3">
              <div className="flex justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Order Total</span>
                <span className="font-bold text-white">${placedOrderDetails.totalAmount}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Items Ordered</span>
                <span className="font-bold text-white">{placedOrderDetails.items.length} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shipping To</span>
                <span className="font-medium text-slate-200">
                  {placedOrderDetails.shippingAddress.fullName} (
                  {placedOrderDetails.shippingAddress.city})
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {navigate ? (
                <>
                  <button
                    onClick={() => {
                      setIsOrderPlaced(false);
                      navigate('/orders');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-600/25"
                  >
                    View My Orders
                  </button>
                  <button
                    onClick={() => {
                      setIsOrderPlaced(false);
                      navigate('/products');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Continue Shopping
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsOrderPlaced(false)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  Start New Order
                </button>
              )}
            </div>
          </div>
        )}

        {/* Interactive Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">Checkout Details</h2>
                  <p className="text-xs text-slate-400">Complete your order details below</p>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={shippingInfo.zip}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                {/* Payment Option Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'card', label: 'Credit Card' },
                      { id: 'paypal', label: 'PayPal' },
                      { id: 'cod', label: 'Pay on Delivery' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`border rounded-xl p-3 cursor-pointer text-center transition-all ${
                          shippingInfo.paymentMethod === method.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={shippingInfo.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="text-xs block">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pay Summary Box */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex justify-between items-center mt-6">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Due Now</span>
                    <span className="text-xl font-extrabold text-white">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
                  >
                    Confirm & Pay <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
