import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../remote-app/src/store/cartSlice.js';
import { fetchProducts } from '../store/productsSlice.js';
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Layers,
  Cpu,
  Globe
} from 'lucide-react';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector((state) => state.products || { items: [], status: 'idle' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts({ category: 'All' }));
    }
  }, [dispatch, status]);

  const featuredProducts = items.slice(0, 6);

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnail || product.images?.[0],
        category: product.category,
        rating: product.rating,
        stock: product.stock,
        badge: product.brand || `${Math.round(product.discountPercentage || 5)}% OFF`
      })
    );
  };

  return (
    <div className="space-y-16 pb-16 pt-6 text-left">
      {/* Clean E-Commerce Hero Banner Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-extrabold bg-[#202433] text-[#A0D2EB] border border-[#D0BDF4]/30 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#A0D2EB] animate-ping" />
            <Globe className="w-4 h-4 text-[#A0D2EB]" /> Live REST API Micro Frontend Marketplace
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#E5EAF5] max-w-5xl mx-auto leading-tight font-heading">
            Discover Next-Gen Products <br />
            <span className="gradient-text">
              Powered by Micro Frontend Architecture
            </span>
          </h1>

          <p className="text-[#E5EAF5]/85 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Integrating modular React micro-applications with dynamic REST product endpoints from <code className="text-[#A0D2EB] font-mono text-xs bg-[#141622] px-2.5 py-1 rounded-lg border border-[#D0BDF4]/30">dummyjson.com/products</code> across independent Vite federation ports.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <NavLink
              to="/products"
              className="w-full sm:w-auto btn-gradient font-extrabold px-8 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
            >
              Explore Live Catalog <ArrowRight className="w-5 h-5" />
            </NavLink>

            <NavLink
              to="/cart"
              className="w-full sm:w-auto justify-center bg-[#202433] hover:bg-[#2c3144] text-[#E5EAF5] border border-[#D0BDF4]/30 font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-2.5 text-sm sm:text-base"
            >
              <ShoppingBag className="w-5 h-5 text-[#A0D2EB]" /> Open Remote Cart MFE
            </NavLink>
          </div>

          {/* Micro Telemetry Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-xs font-semibold text-[#D0BDF4]">
            <div className="flex items-center gap-2 bg-[#202433] border border-[#D0BDF4]/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Host: Port 5000
            </div>
            <div className="flex items-center gap-2 bg-[#202433] border border-[#D0BDF4]/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#A0D2EB]" /> Cart MFE: Port 5001
            </div>
            <div className="flex items-center gap-2 bg-[#202433] border border-[#D0BDF4]/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#D0BDF4]" /> Auth MFE: Port 5002
            </div>
          </div>
        </div>
      </section>

      {/* Feature Matrix Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Globe, title: 'DummyJSON REST API', desc: 'Real-time live product catalog dynamically fetched across ports.', color: '#A0D2EB' },
            { icon: Cpu, title: 'Vite Module Federation', desc: 'Host and Remote Micro Frontends lazy-loaded independently.', color: '#D0BDF4' },
            { icon: Zap, title: 'Redux Toolkit Store', desc: 'Centralized state management for Cart, Auth, and Products.', color: '#8458B3' },
            { icon: Sparkles, title: 'Modern Clean Theme', desc: 'Curated 1st snap palette with clean structured responsive grids.', color: '#E5EAF5' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="clean-card rounded-3xl p-6 text-left space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#141622] border border-[#D0BDF4]/30 flex items-center justify-center shadow-inner">
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h4 className="text-base font-extrabold text-[#E5EAF5] font-heading">{item.title}</h4>
              <p className="text-xs text-[#D0BDF4] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Uniform Trending Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 border-b border-[#D0BDF4]/20 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#A0D2EB] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Dynamic Live REST Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#E5EAF5] font-heading">Trending Products</h2>
          </div>
          <NavLink
            to="/products"
            className="text-xs sm:text-sm font-bold text-[#A0D2EB] hover:text-[#D0BDF4] flex items-center gap-1.5 bg-[#202433] border border-[#D0BDF4]/30 px-4 py-2 rounded-xl transition-all"
          >
            View Full Catalog ({items.length}) <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        {status === 'loading' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="clean-card rounded-3xl p-5 h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate('/products')}
                className="clean-card rounded-3xl p-5 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="h-52 rounded-2xl bg-[#141622] overflow-hidden relative mb-4 border border-[#D0BDF4]/20 flex items-center justify-center p-4">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#8458B3] text-white text-xs font-black px-2.5 py-1 rounded-xl uppercase tracking-wider shadow">
                      {product.category}
                    </span>
                  </div>

                  {/* Rating & Brand */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold bg-[#141622] px-2 py-0.5 rounded border border-[#D0BDF4]/20">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span>{product.rating}</span>
                    </div>
                    {product.brand && (
                      <span className="text-[11px] font-mono text-[#D0BDF4] bg-[#141622] px-2 py-0.5 rounded border border-[#D0BDF4]/20">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-[#E5EAF5] group-hover:text-[#A0D2EB] transition-colors line-clamp-1 font-heading mt-1">
                    {product.title}
                  </h3>
                  <p className="text-[#D0BDF4]/80 text-xs mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
                </div>

                {/* Price & Action Button */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D0BDF4]/20">
                  <div>
                    <span className="text-xs text-[#D0BDF4] block">Price</span>
                    <span className="text-xl font-black text-[#A0D2EB] font-heading">${product.price}</span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="btn-gradient px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Truck,
              title: 'Free Global Shipping',
              desc: 'Express delivery on all orders over $100.'
            },
            {
              icon: ShieldCheck,
              title: 'Buyer Protection Guarantee',
              desc: '100% money-back policy with hassle-free returns.'
            },
            {
              icon: RotateCcw,
              title: 'Synchronized Micro State',
              desc: 'Real-time Redux state synchronization across MFEs.'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="clean-card rounded-3xl p-6 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#8458B3]/20 border border-[#8458B3]/40 text-[#A0D2EB] flex items-center justify-center shadow-inner">
                <feature.icon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-extrabold text-[#E5EAF5] font-heading pt-1">{feature.title}</h4>
              <p className="text-[#D0BDF4] text-xs leading-relaxed max-w-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
