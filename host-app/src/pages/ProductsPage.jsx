import { useEffect, useState } from 'react';
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
  ShieldAlert
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#202433] border border-[#A0D2EB] text-[#E5EAF5] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <CheckCircle className="w-5 h-5 text-[#A0D2EB]" />
          <span className="text-sm font-bold">
            Added <span className="text-[#A0D2EB]">{addedToast}</span> to Cart!
          </span>
        </div>
      )}

      {/* Page Header Banner */}
      <div className="flex items-center justify-between gap-4 border-b border-[#D0BDF4]/20 pb-6 flex-wrap">
        <div>
          <span className="text-xs font-extrabold text-[#A0D2EB] uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-[#A0D2EB]" /> Dynamic Live API Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#E5EAF5] font-heading">
            Explore Products
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(fetchProducts({ category: selectedCategory, search: searchQuery }))}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E5EAF5] bg-[#202433] hover:bg-[#2c3144] border border-[#D0BDF4]/30 px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin text-[#A0D2EB]' : ''}`} />
            Refresh API
          </button>
          <span className="text-xs text-[#A0D2EB] font-bold bg-[#141622] border border-[#D0BDF4]/30 px-4 py-2.5 rounded-xl shadow-inner">
            {displayProducts.length} items loaded
          </span>
        </div>
      </div>

      {/* Control Panel: Search & Category Ribbon */}
      <div className="clean-card rounded-3xl p-5 space-y-4 shadow-xl">
        {/* Top Row: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4.5 h-4.5 text-[#A0D2EB] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search live catalog (e.g. mascara, phone, watch, fragrance)..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-2xl pl-11 pr-10 py-3.5 text-sm text-[#E5EAF5] placeholder-[#D0BDF4]/60 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D0BDF4] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto bg-[#141622] border border-[#D0BDF4]/30 px-4 py-3 rounded-2xl justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#A0D2EB]" />
              <span className="text-xs font-bold text-[#D0BDF4] whitespace-nowrap">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-[#E5EAF5] outline-none font-bold cursor-pointer pr-2"
            >
              <option value="featured" className="bg-[#141622] text-[#E5EAF5]">Featured</option>
              <option value="price-low" className="bg-[#141622] text-[#E5EAF5]">Price: Low to High</option>
              <option value="price-high" className="bg-[#141622] text-[#E5EAF5]">Price: High to Low</option>
              <option value="rating" className="bg-[#141622] text-[#E5EAF5]">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-[#D0BDF4]/20">
          <span className="text-xs text-[#D0BDF4] font-extrabold uppercase tracking-wider pr-2 flex-shrink-0">
            Category Filter:
          </span>
          {allCategoryPills.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap capitalize transition-all cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'btn-gradient text-white shadow-lg scale-105'
                  : 'bg-[#141622] text-[#D0BDF4] hover:text-[#E5EAF5] border border-[#D0BDF4]/20 hover:border-[#A0D2EB]/50'
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="clean-card rounded-3xl p-5 h-96 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {status === 'failed' && (
        <div className="text-center py-16 bg-[#8458B3]/20 border border-[#8458B3]/40 rounded-3xl max-w-lg mx-auto space-y-4">
          <ShieldAlert className="w-12 h-12 text-[#A0D2EB] mx-auto" />
          <div>
            <h3 className="text-lg font-extrabold text-[#E5EAF5] font-heading">Failed to Load Live API</h3>
            <p className="text-xs text-[#D0BDF4] mt-1">{error}</p>
          </div>
          <button
            onClick={() => dispatch(fetchProducts({ category: selectedCategory, search: searchQuery }))}
            className="btn-gradient text-xs font-extrabold px-6 py-3 rounded-2xl cursor-pointer"
          >
            Retry API Call
          </button>
        </div>
      )}

      {/* Empty Search Result State */}
      {status === 'succeeded' && displayProducts.length === 0 && (
        <div className="text-center py-20 clean-card rounded-3xl">
          <p className="text-[#D0BDF4] text-base font-bold">No products match your search criteria.</p>
          <button
            onClick={() => {
              dispatch(setSearchQuery(''));
              dispatch(setSelectedCategory('All'));
            }}
            className="mt-4 text-xs font-bold text-[#A0D2EB] hover:underline cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Uniform Clean 4-Column Product Grid */}
      {status === 'succeeded' && displayProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="clean-card rounded-3xl p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Product Thumbnail Container */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="h-56 rounded-2xl bg-[#141622] overflow-hidden relative mb-4 border border-[#D0BDF4]/20 flex items-center justify-center p-4 cursor-pointer"
                >
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discountPercentage && (
                    <span className="absolute top-3 left-3 bg-[#8458B3] text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-lg">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="absolute bottom-3 right-3 bg-[#202433]/90 hover:bg-[#2c3144] text-[#E5EAF5] p-2.5 rounded-xl border border-[#D0BDF4]/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quick Specs"
                  >
                    <Info className="w-4 h-4 text-[#A0D2EB]" />
                  </button>
                </div>

                {/* Rating & Category */}
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-[#A0D2EB] uppercase tracking-wider capitalize">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-300 font-bold bg-[#141622] px-2 py-0.5 rounded-md border border-[#D0BDF4]/20">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3
                  onClick={() => setSelectedProduct(product)}
                  className="text-base font-extrabold text-[#E5EAF5] font-heading group-hover:text-[#A0D2EB] transition-colors line-clamp-1 cursor-pointer mt-1"
                >
                  {product.title}
                </h3>
                <p className="text-[#D0BDF4]/80 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D0BDF4]/20">
                <div>
                  <span className="text-xl font-black text-[#A0D2EB] font-heading">${product.price}</span>
                  <span className="text-[11px] text-[#D0BDF4] block font-medium">
                    Stock: {product.stock}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Specs Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141622]/85 backdrop-blur-md animate-slide-up">
          <div className="clean-card rounded-3xl max-w-3xl w-[95%] sm:w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto border-2 border-[#8458B3]/40">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-[#D0BDF4] hover:text-white p-2 rounded-xl bg-[#141622] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="h-64 rounded-2xl overflow-hidden border border-[#D0BDF4]/20 bg-[#141622] flex items-center justify-center p-4">
                  <img
                    src={selectedProduct.thumbnail || selectedProduct.images?.[0]}
                    alt={selectedProduct.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {selectedProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="gallery"
                        className="w-14 h-14 rounded-xl object-cover bg-[#141622] border border-[#D0BDF4]/20 p-1 cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#A0D2EB] uppercase tracking-widest capitalize">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.brand && (
                    <span className="text-xs text-[#D0BDF4] font-mono bg-[#141622] px-2.5 py-1 rounded-lg border border-[#D0BDF4]/20">
                      {selectedProduct.brand}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#E5EAF5] font-heading">{selectedProduct.title}</h2>
                <p className="text-[#D0BDF4] text-xs leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="space-y-2 text-xs border-t border-[#D0BDF4]/20 pt-3">
                  <div className="flex items-center justify-between text-[#D0BDF4]">
                    <span>Warranty</span>
                    <span className="text-[#E5EAF5] font-semibold">{selectedProduct.warrantyInformation || '1 Year Standard'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#D0BDF4]">
                    <span>Shipping</span>
                    <span className="text-[#E5EAF5] font-semibold">{selectedProduct.shippingInformation || 'Ships in 2 days'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-2xl font-black text-[#A0D2EB] pt-2 font-heading">
                  <span>${selectedProduct.price}</span>
                  <span className="text-xs font-bold text-[#D0BDF4]">
                    In Stock ({selectedProduct.stock})
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full btn-gradient py-4 rounded-2xl font-black flex items-center justify-center gap-2 text-sm cursor-pointer font-heading"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
