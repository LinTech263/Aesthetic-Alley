import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFavorited = isInWishlist(product.id);

  // Secondary angle image if available
  const secondaryImage = product.images[1] || product.heroImage;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col font-sans transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-[#F4EFEB] border border-[#E8E2D9]/80 cursor-pointer">
        {/* Skeleton placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#EFE8E0] animate-pulse" />
        )}

        {/* Primary Image */}
        <img
          src={product.heroImage}
          alt={product.imageAlts[0] || product.name}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
            isHovered && secondaryImage !== product.heroImage
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Angle Image on Hover */}
        {secondaryImage !== product.heroImage && (
          <img
            src={secondaryImage}
            alt={product.imageAlts[1] || `${product.name} alternate perspective`}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Click area to go to PDP */}
        <div
          className="absolute inset-0 z-10"
          onClick={() => navigateTo('product', { productId: product.id })}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#1A1918] text-[#FAF8F5]">
              New In
            </span>
          )}
          {product.isLimited && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#B85D38] text-white">
              Atelier Limited
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#C49B45] text-[#1A1918]">
              Signature Piece
            </span>
          )}
          {product.stockCount <= 3 && product.stockCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-stone-900/90 text-amber-300">
              Only {product.stockCount} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`btn-wishlist-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-xs transition-all ${
            isFavorited
              ? 'bg-[#B85D38] text-white shadow-md'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#B85D38]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className="w-4 h-4"
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </button>

        {/* Quick Add To Cart on Hover / Mobile persistent bar */}
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <button
            id={`btn-quick-add-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.variants[0]);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1A1918]/95 hover:bg-[#B85D38] text-[#FAF8F5] text-xs uppercase font-semibold tracking-wider transition-colors shadow-lg backdrop-blur-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('product', { productId: product.id });
            }}
            className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-stone-800 transition-colors shadow-lg backdrop-blur-xs"
            title="Inspect Piece Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Meta details */}
      <div className="mt-3.5 flex flex-col space-y-1">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-stone-600 font-semibold">
          <span>{product.room}</span>
          <div className="flex items-center gap-1 text-stone-600 font-medium">
            <Star className="w-3 h-3 text-[#C49B45] fill-[#C49B45]" />
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        <h3
          onClick={() => navigateTo('product', { productId: product.id })}
          className="font-serif text-base font-medium text-[#1A1918] group-hover:text-[#B85D38] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-1">
          {product.materials.split(',')[0]}
        </p>

        {/* Pricing */}
        <div className="pt-1 flex items-baseline gap-2">
          <span className="font-sans text-sm font-semibold text-[#1A1918]">
            {formatPrice(product.sellPrice)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.sellPrice && (
            <span className="font-sans text-xs text-stone-600 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
