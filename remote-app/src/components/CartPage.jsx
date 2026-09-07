import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-[#141622] text-[#E5EAF5] py-8 px-4 sm:px-6 lg:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-8 animate-slide-up">
        {/* MFE Header Badge */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#D0BDF4]/20 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#202433] text-[#A0D2EB] border border-[#D0BDF4]/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Remote Micro Frontend Cart (Port 5001)
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#E5EAF5] font-heading flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-[#A0D2EB]" />
              Your Shopping Cart
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D0BDF4] hover:text-[#A0D2EB] px-4 py-2 rounded-xl border border-[#D0BDF4]/30 hover:border-[#8458B3]/50 bg-[#202433] transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Clear Cart
            </button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 && !isOrderPlaced && (
          <div className="text-center py-20 clean-card rounded-3xl max-w-2xl mx-auto my-12 space-y-4">
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-[#141622] flex items-center justify-center text-[#D0BDF4] border border-[#D0BDF4]/30 shadow-inner">
              <ShoppingBasket className="w-10 h-10 text-[#A0D2EB]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#E5EAF5] font-heading">Your Cart is Empty</h2>
            <p className="text-[#D0BDF4] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Explore our live product catalog and add your favorite items directly to the Remote Cart MFE!
            </p>
            {navigate ? (
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 btn-gradient font-extrabold px-8 py-3.5 rounded-2xl shadow-xl transition-all cursor-pointer text-xs"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="/products"
                className="inline-flex items-center gap-2 btn-gradient font-extrabold px-8 py-3.5 rounded-2xl shadow-xl transition-all cursor-pointer text-xs"
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
                  className="clean-card rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 transition-all group"
                >
                  {/* Thumbnail Container */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#141622] overflow-hidden flex-shrink-0 relative border border-[#D0BDF4]/30 p-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.badge && (
                      <span className="absolute top-1.5 left-1.5 bg-[#8458B3] text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <span className="text-xs font-extrabold text-[#A0D2EB] tracking-wider uppercase">
                      {item.category || 'Gear'}
                    </span>
                    <h3 className="text-lg font-black text-[#E5EAF5] font-heading truncate mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-[#A0D2EB] text-sm font-bold mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-[#141622] border border-[#D0BDF4]/30 rounded-2xl p-1.5">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                        )
                      }
                      className="w-8 h-8 rounded-xl bg-[#202433] hover:bg-[#2c3144] flex items-center justify-center text-[#E5EAF5] transition-colors cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-8 text-center font-black text-[#E5EAF5] text-sm font-heading">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                        )
                      }
                      className="w-8 h-8 rounded-xl bg-[#202433] hover:bg-[#2c3144] flex items-center justify-center text-[#E5EAF5] transition-colors cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Subtotal & Delete */}
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D0BDF4]/20">
                    <div className="text-right">
                      <span className="text-xs text-[#D0BDF4] block sm:hidden">Total</span>
                      <span className="text-xl font-black text-[#A0D2EB] font-heading">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-[#D0BDF4] hover:text-rose-400 p-2 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4 clean-card rounded-3xl p-6 shadow-xl space-y-6 text-[#E5EAF5]">
              <h2 className="text-xl font-black text-[#E5EAF5] font-heading pb-4 border-b border-[#D0BDF4]/20">
                Order Summary
              </h2>

              {/* Coupon Section */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D0BDF4] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#A0D2EB]" /> Apply Promo Code
                </label>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter code (e.g. SAVE10)"
                    className="flex-1 bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] text-xs text-[#E5EAF5] px-3.5 py-2.5 rounded-xl outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="btn-gradient text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors shadow-md cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Preset Promo Buttons */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[11px] text-[#D0BDF4]">Quick codes:</span>
                  {['SAVE10', 'TECH20', 'SUPER50'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handlePresetCoupon(code)}
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                        couponCode === code
                          ? 'bg-[#8458B3] text-white border-[#8458B3]'
                          : 'bg-[#141622] text-[#D0BDF4] border-[#D0BDF4]/30 hover:border-[#D0BDF4]'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>

                {couponSuccess && (
                  <div className="flex items-center justify-between bg-[#8458B3]/20 border border-[#8458B3]/40 text-[#A0D2EB] text-xs px-3 py-2 rounded-xl">
                    <span className="flex items-center gap-1.5 font-bold">
                      <CheckCircle className="w-4 h-4 text-[#A0D2EB]" /> {couponSuccess}
                    </span>
                    <button
                      onClick={() => dispatch(removeCoupon())}
                      className="text-[#A0D2EB] hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-t border-[#D0BDF4]/20 pt-4">
                <div className="flex justify-between text-[#D0BDF4]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#E5EAF5]">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#A0D2EB] font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#D0BDF4]">
                  <span className="flex items-center gap-1">
                    Shipping{' '}
                    {shippingFee === 0 && (
                      <span className="text-[10px] bg-[#8458B3] text-white font-extrabold px-1.5 py-0.2 rounded-md">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-[#E5EAF5]">
                    {shippingFee === 0 ? '$0.00' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#D0BDF4]">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-bold text-[#E5EAF5]">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-black text-[#E5EAF5] pt-3 border-t border-[#D0BDF4]/20">
                  <span>Total Amount</span>
                  <span className="text-[#A0D2EB] text-2xl font-heading">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full btn-gradient py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-base cursor-pointer font-heading font-black"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D0BDF4]/20 text-[11px] text-[#D0BDF4] font-semibold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A0D2EB]" />
                  <span>256-Bit SSL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#A0D2EB]" />
                  <span>Global Express</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Confirmation Screen */}
        {isOrderPlaced && placedOrderDetails && (
          <div className="my-10 clean-card rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl text-center space-y-6 text-[#E5EAF5]">
            <div className="w-20 h-20 bg-[#8458B3]/30 border border-[#8458B3]/50 text-[#A0D2EB] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#8458B3]/20">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-[#E5EAF5] font-heading">Order Confirmed!</h2>
              <p className="text-[#D0BDF4] text-sm mt-1">
                Thank you for your purchase. Your order ID is{' '}
                <span className="font-mono text-[#A0D2EB] font-bold">
                  {placedOrderDetails.id}
                </span>
              </p>
            </div>

            <div className="bg-[#141622] border border-[#D0BDF4]/20 rounded-2xl p-5 text-left text-sm space-y-3">
              <div className="flex justify-between pb-3 border-b border-[#D0BDF4]/20">
                <span className="text-[#D0BDF4]">Order Total</span>
                <span className="font-black text-[#A0D2EB] font-heading">${placedOrderDetails.totalAmount}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-[#D0BDF4]/20">
                <span className="text-[#D0BDF4]">Items Ordered</span>
                <span className="font-bold text-[#E5EAF5]">{placedOrderDetails.items.length} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#D0BDF4]">Shipping To</span>
                <span className="font-semibold text-[#E5EAF5]">
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
                    className="btn-gradient font-extrabold px-6 py-3.5 rounded-2xl shadow-lg cursor-pointer"
                  >
                    View My Orders
                  </button>
                  <button
                    onClick={() => {
                      setIsOrderPlaced(false);
                      navigate('/products');
                    }}
                    className="bg-[#141622] hover:bg-[#202433] text-[#E5EAF5] border border-[#D0BDF4]/30 font-bold px-6 py-3.5 rounded-2xl transition-all cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsOrderPlaced(false)}
                  className="btn-gradient font-bold px-6 py-3.5 rounded-2xl cursor-pointer"
                >
                  Start New Order
                </button>
              )}
            </div>
          </div>
        )}

        {/* Interactive Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#141622]/85 backdrop-blur-md animate-slide-up">
            <div className="clean-card rounded-3xl max-w-xl w-[95%] sm:w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-[#E5EAF5] text-left border-2 border-[#8458B3]/40">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-5 right-5 text-[#D0BDF4] hover:text-white p-2 rounded-xl bg-[#141622] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#8458B3]/20 border border-[#8458B3]/40 text-[#A0D2EB] flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#E5EAF5] font-heading">Checkout Details</h2>
                  <p className="text-xs text-[#D0BDF4]">Complete your shipping & payment details</p>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#D0BDF4] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-xl px-4 py-3 text-[#E5EAF5] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#D0BDF4] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-xl px-4 py-3 text-[#E5EAF5] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#D0BDF4] mb-1">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-xl px-4 py-3 text-[#E5EAF5] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#D0BDF4] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-xl px-4 py-3 text-[#E5EAF5] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#D0BDF4] mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={shippingInfo.zip}
                      onChange={handleInputChange}
                      className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-xl px-4 py-3 text-[#E5EAF5] outline-none"
                    />
                  </div>
                </div>

                {/* Payment Option Selection */}
                <div>
                  <label className="block font-bold text-[#D0BDF4] mb-2">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'card', label: 'Credit Card' },
                      { id: 'paypal', label: 'PayPal' },
                      { id: 'cod', label: 'Pay on Delivery' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`border rounded-xl p-3 cursor-pointer text-center transition-all ${
                          shippingInfo.paymentMethod === method.id
                            ? 'bg-[#8458B3] border-[#8458B3] text-white font-extrabold shadow-md'
                            : 'bg-[#141622] border-[#D0BDF4]/30 text-[#D0BDF4] hover:border-[#D0BDF4]'
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
                <div className="bg-[#141622] border border-[#D0BDF4]/30 rounded-2xl p-4 flex justify-between items-center mt-6">
                  <div>
                    <span className="text-xs text-[#D0BDF4] block">Total Due Now</span>
                    <span className="text-2xl font-black text-[#A0D2EB] font-heading">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn-gradient font-black px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs cursor-pointer font-heading"
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
