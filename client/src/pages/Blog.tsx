/*
 * KHORA Blog Page
 * Design: Cosmic Nebula Interface - Apple VisionOS 2026 Aesthetic
 * Educational content about healthy vegan nutrition
 * Includes Schema.org structured data for SEO
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import { blogArticles, getFeaturedArticle } from "@/data/blogArticles";

// Generate Schema.org Blog structured data
function generateBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Khora - Educație Vegană",
    "description": "Articole educative despre nutriție vegană sănătoasă, bazate pe cercetări științifice",
    "url": "https://khora.manus.space/blog",
    "inLanguage": "ro-RO",
    "publisher": {
      "@type": "Organization",
      "name": "Khora - The Unlearning School",
      "url": "https://khora.manus.space",
      "logo": {
        "@type": "ImageObject",
        "url": "https://khora.manus.space/images/khora-logo.png"
      }
    },
    "blogPost": blogArticles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "image": article.heroImage,
      "datePublished": article.publishDate,
      "url": `https://khora.manus.space/blog/${article.slug}`,
      "author": {
        "@type": "Organization",
        "name": "Khora"
      },
      "keywords": article.tags.join(", ")
    }))
  };
}

// Generate ItemList schema for article collection
function generateArticleListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Articole Blog Khora",
    "description": "Lista completă de articole educative despre nutriție vegană",
    "numberOfItems": blogArticles.length,
    "itemListElement": blogArticles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "name": article.title,
        "url": `https://khora.manus.space/blog/${article.slug}`
      }
    }))
  };
}

// Generate Organization schema
function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Khora",
    "alternateName": "Khora - Nutriție Vegană Personalizată",
    "url": "https://khora.manus.space",
    "logo": "https://khora.manus.space/images/khora-logo.png",
    "description": "Aplicație premium de nutriție vegană cu rețete personalizate, tracking hidratare și educație bazată pe știință",
    "sameAs": [
      "https://www.facebook.com/khora.manus.space",
      "https://www.instagram.com/khora.manus.space"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@dezvatare.ro",
      "telephone": "+40722598346",
      "contactType": "customer service",
      "availableLanguage": ["Romanian", "English"]
    }
  };
}

export default function Blog() {
  const featuredArticle = getFeaturedArticle();
  const otherArticles = blogArticles.filter(a => !a.featured);

  // Inject Schema.org structured data
  useEffect(() => {
    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[data-schema="blog"]');
    existingSchemas.forEach(el => el.remove());

    // Add Blog schema
    const blogSchema = document.createElement('script');
    blogSchema.type = 'application/ld+json';
    blogSchema.setAttribute('data-schema', 'blog');
    blogSchema.textContent = JSON.stringify(generateBlogSchema());
    document.head.appendChild(blogSchema);

    // Add ItemList schema
    const listSchema = document.createElement('script');
    listSchema.type = 'application/ld+json';
    listSchema.setAttribute('data-schema', 'blog');
    listSchema.textContent = JSON.stringify(generateArticleListSchema());
    document.head.appendChild(listSchema);

    // Add Organization schema
    const orgSchema = document.createElement('script');
    orgSchema.type = 'application/ld+json';
    orgSchema.setAttribute('data-schema', 'blog');
    orgSchema.textContent = JSON.stringify(generateOrganizationSchema());
    document.head.appendChild(orgSchema);

    // Update page title and meta
    document.title = "Blog Khora - Educație Vegană | Articole despre Nutriție";
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Articole educative despre nutriție vegană sănătoasă, bazate pe cercetări științifice. Învață despre B12, proteine vegetale, superfoods și multe altele.');

    // Cleanup on unmount
    return () => {
      const schemas = document.querySelectorAll('script[data-schema="blog"]');
      schemas.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 pb-44">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 px-6 text-center mb-8"
        >
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background: 'rgba(0, 212, 170, 0.1)',
              border: '1px solid rgba(0, 212, 170, 0.2)',
            }}
          >
            <BookOpen className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-[#00d4aa] text-sm font-medium">Educație Vegană</span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Blog Khora
          </h1>
          <p className="text-white/50 max-w-md mx-auto">
            Articole educative despre nutriție vegană sănătoasă, bazate pe cercetări științifice
          </p>
        </motion.header>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-6 mb-8"
          >
            <Link href={`/blog/${featuredArticle.slug}`}>
              <article 
                className="relative rounded-3xl overflow-hidden group cursor-pointer max-w-4xl mx-auto"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <meta itemProp="headline" content={featuredArticle.title} />
                <meta itemProp="description" content={featuredArticle.excerpt} />
                <meta itemProp="datePublished" content={featuredArticle.publishDate} />
                
                {/* Hero Image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img 
                    src={featuredArticle.heroImage} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    itemProp="image"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(10, 15, 26, 0.9) 100%)',
                    }}
                  />
                  
                  {/* Featured Badge */}
                  <div 
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                    }}
                  >
                    ⚠️ Articol Important
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-white/40">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={featuredArticle.publishDate} itemProp="datePublished">
                        {new Date(featuredArticle.publishDate).toLocaleDateString('ro-RO')}
                      </time>
                    </span>
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: 'rgba(0, 212, 170, 0.1)',
                        color: '#00d4aa',
                      }}
                      itemProp="articleSection"
                    >
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors" itemProp="headline">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2" itemProp="description">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[#00d4aa] font-medium text-sm group-hover:gap-3 transition-all">
                    Citește articolul
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.section>
        )}

        {/* Other Articles Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 max-w-4xl mx-auto">
            Mai multe articole
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {otherArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <article 
                    className="rounded-2xl overflow-hidden group cursor-pointer h-full transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={article.heroImage} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        itemProp="image"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(180deg, transparent 30%, rgba(10, 15, 26, 0.8) 100%)',
                        }}
                      />
                      <span className="absolute bottom-2 left-3 text-2xl">{article.emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                        <span 
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: 'rgba(0, 212, 170, 0.1)',
                            color: '#00d4aa',
                          }}
                          itemProp="articleSection"
                        >
                          {article.category}
                        </span>
                      </div>

                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-[#00d4aa] transition-colors" itemProp="headline">
                        {article.title}
                      </h3>
                      <p className="text-white/40 text-xs line-clamp-2" itemProp="description">
                        {article.excerpt}
                      </p>
                      <meta itemProp="datePublished" content={article.publishDate} />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
