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
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
            <Globe className="w-4 h-4 text-indigo-400" /> Powered by DummyJSON Live Product API
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-none">
            Live Product Marketplace <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Micro Frontend Store
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Discover thousands of live products fetched dynamically from <code className="text-indigo-300 font-mono text-sm bg-slate-900 px-2 py-0.5 rounded border border-slate-800">dummyjson.com/products</code>, integrated seamlessly across Host and Remote Micro Frontend apps!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <NavLink
              to="/products"
              className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-base"
            >
              Explore Live API Products <ArrowRight className="w-5 h-5" />
            </NavLink>

            <NavLink
              to="/cart"
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-2 text-base backdrop-blur-md"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-400" /> View Remote Cart MFE
            </NavLink>
          </div>

          {/* Feature Pill Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
            {[
              { icon: Globe, title: 'DummyJSON API', desc: 'Real-time REST endpoints' },
              { icon: Cpu, title: 'Vite Federation', desc: 'Host & Remote MFE' },
              { icon: Zap, title: 'Redux AsyncThunk', desc: 'Centralized API State' },
              { icon: Sparkles, title: 'NavLink Routing', desc: 'Seamless Single Page App' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl text-left backdrop-blur-sm"
              >
                <item.icon className="w-6 h-6 text-indigo-400 mb-2" />
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Live REST API Data
            </span>
            <h2 className="text-3xl font-extrabold text-white">Trending API Products</h2>
          </div>
          <NavLink
            to="/products"
            className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All Catalog <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        {status === 'loading' ? (
          <div
            className="grid gap-6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate('/products')}
                className="group bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="h-52 rounded-2xl bg-slate-950 overflow-hidden relative mb-4 border border-slate-800 flex items-center justify-center p-4">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-700 text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-lg capitalize">
                      {product.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                    {product.brand && (
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{product.description}</p>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                  <div>
                    <span className="text-xs text-slate-500 block">Price</span>
                    <span className="text-xl font-extrabold text-white">${product.price}</span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold p-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 text-xs"
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
              desc: 'Express worldwide shipping on all orders over $100.'
            },
            {
              icon: ShieldCheck,
              title: 'Buyer Protection',
              desc: '100% money-back guarantee with hassle-free 30-day returns.'
            },
            {
              icon: RotateCcw,
              title: 'Live API Synchronized',
              desc: 'Real-time product stock, rating, and specs powered by REST API.'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center space-y-3 hover:border-indigo-500/40 transition-colors shadow-lg backdrop-blur-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-inner">
                <feature.icon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white pt-1">{feature.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
