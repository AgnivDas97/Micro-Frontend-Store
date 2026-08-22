import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../remote-app/src/store/cartSlice.js';
import {
  fetchProducts,
  fetchCategories,
  setSelectedCategory,
  setSearchQuery
} from '../store/productsSlice.js';
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  CheckCircle,
  X,
  Sparkles,
  Info,
  RefreshCw,
  Tag,
  ShieldAlert,
  Truck
} from 'lucide-react';

export default function ProductsPage() {
  const dispatch = useDispatch();

  const { items, categories, status, selectedCategory, searchQuery, error } = useSelector(
    (state) => state.products || { items: [], categories: [], status: 'idle', selectedCategory: 'All', searchQuery: '' }
  );

  const [sortBy, setSortBy] = useState('featured');
  const [addedToast, setAddedToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products when category or search query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchProducts({ category: selectedCategory, search: searchQuery }));
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, selectedCategory, searchQuery]);

  // Sort Logic
  let displayProducts = [...items];
  if (sortBy === 'price-low') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    displayProducts.sort((a, b) => b.rating - a.rating);
  }

  const handleAddToCart = (product) => {
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
    setAddedToast(product.title);
    setTimeout(() => {
      setAddedToast(null);
    }, 2500);
  };

  const allCategoryPills = ['All', ...(categories.slice(0, 10))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold">
            Added <span className="text-indigo-400">{addedToast}</span> to Cart!
          </span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-6 flex-wrap text-left">
        <div className="text-left">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> DummyJSON Live API Catalog
          </span>
          <h1 className="text-3xl font-extrabold text-white">Explore Products</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(fetchProducts({ category: selectedCategory, search: searchQuery }))}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-2 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${status === 'loading' ? 'animate-spin text-indigo-400' : ''}`} />
            Refresh API
          </button>
          <span className="text-xs text-slate-400 font-semibold bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
            {displayProducts.length} items loaded
          </span>
        </div>
      </div>

      {/* Search & Filters Control Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md space-y-4 shadow-xl">
        {/* Top Row: Search Bar + Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search API products (e.g. mascara, watch, phone)..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full bg-slate-950/90 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-10 py-3 text-sm text-white outline-none transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-950/90 border border-slate-800 px-3.5 py-2.5 rounded-xl justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-white outline-none font-bold cursor-pointer pr-2"
            >
              <option value="featured" className="bg-slate-900 text-white">Featured</option>
              <option value="price-low" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price-high" className="bg-slate-900 text-white">Price: High to Low</option>
              <option value="rating" className="bg-slate-900 text-white">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-800/80">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider pr-1 flex-shrink-0">
            Categories:
          </span>
          {allCategoryPills.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap capitalize transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton State */}
      {status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 h-96 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {status === 'failed' && (
        <div className="text-center py-16 bg-rose-500/10 border border-rose-500/20 rounded-3xl max-w-lg mx-auto">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Failed to Load Products</h3>
          <p className="text-xs text-slate-400 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts({ category: selectedCategory, search: searchQuery }))}
            className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Products Grid */}
      {status === 'succeeded' && displayProducts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/60">
          <p className="text-slate-400 text-base font-semibold">No products found matching your search.</p>
          <button
            onClick={() => {
              dispatch(setSearchQuery(''));
              dispatch(setSelectedCategory('All'));
            }}
            className="mt-4 text-xs font-bold text-indigo-400 hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {status === 'succeeded' && displayProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="h-56 rounded-2xl bg-slate-950 overflow-hidden relative mb-4 border border-slate-800 flex items-center justify-center p-4 cursor-pointer"
                >
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.discountPercentage && (
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow-md">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="absolute bottom-3 right-3 bg-slate-950/80 hover:bg-slate-900 text-slate-300 p-2 rounded-xl border border-slate-700/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="View Product Specs"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider capitalize">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3
                  onClick={() => setSelectedProduct(product)}
                  className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 cursor-pointer"
                >
                  {product.title}
                </h3>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">{product.description}</p>
              </div>

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white">${product.price}</span>
                    {product.discountPercentage && (
                      <span className="text-xs text-slate-500 line-through">
                        ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium block">
                    Stock: {product.stock} available
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 text-xs"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-[95%] sm:w-full p-4 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div className="h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center p-4">
                  <img
                    src={selectedProduct.thumbnail || selectedProduct.images?.[0]}
                    alt={selectedProduct.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Additional Images Gallery */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {selectedProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="gallery"
                        className="w-14 h-14 rounded-lg object-cover bg-slate-950 border border-slate-800 p-1 cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest capitalize">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.brand && (
                    <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded">
                      Brand: {selectedProduct.brand}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-black text-white">{selectedProduct.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Warranty</span>
                    <span className="text-slate-200 font-medium">{selectedProduct.warrantyInformation || '1 Year Standard'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="text-slate-200 font-medium">{selectedProduct.shippingInformation || 'Ships in 2 days'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Return Policy</span>
                    <span className="text-slate-200 font-medium">{selectedProduct.returnPolicy || '30 days returns'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-2xl font-extrabold text-white pt-2">
                  <span>${selectedProduct.price}</span>
                  <span className="text-xs font-semibold text-emerald-400">
                    {selectedProduct.availabilityStatus || 'In Stock'} ({selectedProduct.stock})
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart Now
                </button>
              </div>
            </div>

            {/* Customer Reviews Section */}
            {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
              <div className="mt-6 border-t border-slate-800 pt-6 space-y-3">
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Customer Reviews ({selectedProduct.reviews.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProduct.reviews.slice(0, 2).map((rev, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-2xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-bold text-white">{rev.reviewerName}</span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" /> {rev.rating}
                        </div>
                      </div>
                      <p className="text-slate-300 italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
