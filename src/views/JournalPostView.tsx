import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { ChevronLeft, Clock, User, Calendar, Share2 } from 'lucide-react';

export const JournalPostView: React.FC = () => {
  const { journalPosts, selectedJournalSlug, products, navigateTo, showToast } = useStore();

  const post = journalPosts.find((p) => p.slug === selectedJournalSlug) || journalPosts[0];

  if (!post) {
    return (
      <div className="py-20 text-center">
        <p>Essay not found.</p>
        <button onClick={() => navigateTo('journal')} className="underline mt-2">
          Back to Journal
        </button>
      </div>
    );
  }

  // Related shoppable pieces
  const shoppablePieces = (products || []).filter((p) =>
    Array.isArray(post?.relatedProductIds) && post.relatedProductIds.includes(p.id)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Essay Link Copied', 'Share link copied to your clipboard.', 'info');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918] pb-20">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigateTo('journal')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 uppercase tracking-wider font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-4 pt-6 pb-10 text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
          {post.category} • {post.readTime}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1918] tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-2">
          <span>By {post.author}</span>
          <span>•</span>
          <span>Published on {post.publishedAt}</span>
          <span>•</span>
          <button onClick={handleShare} className="hover:text-stone-900 flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-96 sm:h-[480px] object-cover rounded-3xl shadow-xl"
        />
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 prose prose-stone font-sans text-stone-800 text-sm sm:text-base leading-relaxed space-y-6">
        <p className="font-serif text-lg sm:text-xl text-stone-900 leading-relaxed italic border-l-2 border-[#B85D38] pl-4">
          "{post.excerpt}"
        </p>

        <p>
          Architecture in Harare and across the highveld has undergone a profound renaissance. Where European minimalism once dictated stark clinical whites and synthetic composites, contemporary African homeowners are embracing geological permanence. The warmth of thirty-six-month seasoned Zambezi teak brings a quiet authority into high-ceilinged plaster rooms that cannot be simulated.
        </p>

        <h3 className="font-serif text-2xl text-[#1A1918] pt-4">The Principle of Single-Piece Weight</h3>
        <p>
          In quiet luxury, weight is a sensorial metric. When you touch a console hand-turned from Baikiaea plurijuga or run your palm along the chilled, wax-finished facet of a Chitungwiza springstone vessel, the body perceives truth. There is no hollow resonance, no veneer that will peel under the dry warmth of our dry winter highveld afternoons.
        </p>

        <p>
          Every piece in our Harare workshop is calibrated to endure generations. To collect slowly is to honor the hands of the carver, the woodturner, and the landscape that surrendered the fallen log.
        </p>
      </article>

      {/* Shoppable Pieces in this Article */}
      {shoppablePieces.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-[#E8E2D9]">
          <div className="text-center mb-10 space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
              Curated Acquisition
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918]">Pieces Featured in this Essay</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {shoppablePieces.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
