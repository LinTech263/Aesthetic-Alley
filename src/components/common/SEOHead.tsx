import React, { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export const SEOHead: React.FC = () => {
  const { currentView, products, selectedProductId, journalPosts, selectedJournalSlug } = useStore();

  useEffect(() => {
    let title = 'Aesthetic Alley | Quiet Luxury Home Decor & Artisanal Accents Zimbabwe';
    let description = 'Discover bespoke Zimbabwean teak furniture, architectural lighting, hand-loomed textiles, and contemporary Shona stonework. Express Harare & Bulawayo delivery and insured diaspora shipping.';
    let schemaJson: Record<string, unknown> | null = null;

    if (currentView === 'product' && selectedProductId) {
      const product = products.find((p) => p.id === selectedProductId);
      if (product) {
        title = product.seo.metaTitle || `${product.name} | Aesthetic Alley Zimbabwe`;
        description = product.seo.metaDescription || product.description;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: product.images,
          description: product.description,
          sku: product.variants[0]?.sku || product.id,
          brand: {
            '@type': 'Brand',
            name: 'Aesthetic Alley'
          },
          offers: {
            '@type': 'Offer',
            url: window.location.href,
            priceCurrency: 'USD',
            price: product.sellPrice,
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'Aesthetic Alley'
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount
          }
        };
      }
    } else if (currentView === 'journal-post' && selectedJournalSlug) {
      const post = journalPosts.find((p) => p.slug === selectedJournalSlug);
      if (post) {
        title = `${post.title} | Aesthetic Alley Journal`;
        description = post.excerpt;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          image: [post.heroImage],
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author
          },
          publisher: {
            '@type': 'Organization',
            name: 'Aesthetic Alley'
          },
          description: post.excerpt
        };
      }
    } else if (currentView === 'shop') {
      title = 'Curated Collection | Bespoke Furniture, Lighting & Decor | Aesthetic Alley';
      description = 'Browse our complete catalog of Zimbabwean home decor: Zambezi teak, black springstone sculpture, Binga palm textiles, and tactile lighting.';
    } else if (currentView === 'about') {
      title = 'Our Heritage & Atelier Story | Aesthetic Alley Zimbabwe';
      description = 'Crafted between Harare and the Zambezi Valley. Learn how we honor indigenous African materials, sustainable salvage forestry, and master artisans.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update or inject JSON-LD script
    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (schemaJson) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaJson);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [currentView, selectedProductId, selectedJournalSlug, products, journalPosts]);

  return null;
};
