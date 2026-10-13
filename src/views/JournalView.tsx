import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';

export const JournalView: React.FC = () => {
  const { journalPosts, navigateTo } = useStore();

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918]">
      {/* Header */}
      <div className="py-16 bg-[#F4EFEB] border-b border-[#E8E2D9] px-4 text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block">
          Editorial Essays & Styling Notes
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#1A1918]">
          The Atelier Journal
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Observations on contemporary Zimbabwean interior architecture, timber preservation, and collecting modern African fine craft.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigateTo('journal-post', { journalSlug: post.slug })}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-stone-400">
                    <span className="text-[#B85D38] font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 font-medium group-hover:text-[#B85D38] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between text-xs text-stone-400">
                <span>By {post.author}</span>
                <span className="font-semibold text-[#1A1918] group-hover:text-[#B85D38] flex items-center gap-1">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
