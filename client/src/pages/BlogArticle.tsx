/*
 * KHORA Blog Article Page
 * Design: Cosmic Nebula Interface - Apple VisionOS 2026 Aesthetic
 * Individual article view with full content
 * Includes Schema.org structured data for SEO
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, Calendar, Share2, BookOpen } from "lucide-react";
import { Streamdown } from "streamdown";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import { getArticleBySlug, blogArticles } from "@/data/blogArticles";

// Schema.org Article structured data
function generateArticleSchema(article: ReturnType<typeof getArticleBySlug>) {
  if (!article) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.heroImage,
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    "author": {
      "@type": "Organization",
      "name": "Khora - The Unlearning School",
      "url": "https://khora.manus.space"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Khora",
      "logo": {
        "@type": "ImageObject",
        "url": "https://khora.manus.space/images/khora-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://khora.manus.space/blog/${article.slug}`
    },
    "keywords": article.tags.join(", "),
    "articleSection": article.category,
    "wordCount": article.content.join(" ").split(/\s+/).length,
    "inLanguage": "ro-RO"
  };
}

// Schema.org BreadcrumbList
function generateBreadcrumbSchema(article: ReturnType<typeof getArticleBySlug>) {
  if (!article) return null;
  
  const baseUrl = "https://hiczfbzyscvcjafya7v3eu.manus.space";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Acasă",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `${baseUrl}/blog/${article.slug}`
      }
    ]
  };
}

// Schema.org FAQPage for articles with FAQ
function generateFAQSchema(article: ReturnType<typeof getArticleBySlug>) {
  if (!article || !article.faq || article.faq.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug || "");

  // Inject Schema.org structured data
  useEffect(() => {
    if (!article) return;

    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[data-schema="article"]');
    existingSchemas.forEach(el => el.remove());

    // Add Article schema
    const articleSchema = document.createElement('script');
    articleSchema.type = 'application/ld+json';
    articleSchema.setAttribute('data-schema', 'article');
    articleSchema.textContent = JSON.stringify(generateArticleSchema(article));
    document.head.appendChild(articleSchema);

    // Add Breadcrumb schema
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.setAttribute('data-schema', 'article');
    breadcrumbSchema.textContent = JSON.stringify(generateBreadcrumbSchema(article));
    document.head.appendChild(breadcrumbSchema);

    // Add FAQ schema if article has FAQ
    const faqData = generateFAQSchema(article);
    if (faqData) {
      const faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.setAttribute('data-schema', 'article');
      faqSchema.textContent = JSON.stringify(faqData);
      document.head.appendChild(faqSchema);
    }

    // Update page title and meta
    document.title = `${article.title} | Khora Blog`;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.excerpt);

    // Update Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: article.title },
      { property: 'og:description', content: article.excerpt },
      { property: 'og:image', content: article.heroImage },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `https://khora.manus.space/blog/${article.slug}` },
      { property: 'article:published_time', content: article.publishDate },
      { property: 'article:section', content: article.category },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Cleanup on unmount
    return () => {
      const schemas = document.querySelectorAll('script[data-schema="article"]');
      schemas.forEach(el => el.remove());
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CosmicBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Articol negăsit</h1>
            <Link href="/blog">
              <button className="text-[#00d4aa] hover:underline">
                Înapoi la Blog
              </button>
            </Link>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = blogArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 pb-44">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pt-6 px-6"
        >
          <Link href="/blog">
            <button 
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Înapoi la Blog</span>
            </button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 pt-6"
        >
          <div className="max-w-3xl mx-auto">
            {/* Hero Image */}
            <div className="relative h-48 md:h-72 rounded-3xl overflow-hidden mb-6">
              <img 
                src={article.heroImage} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 30%, rgba(10, 15, 26, 0.9) 100%)',
                }}
              />
              
              {/* Category Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="text-4xl">{article.emoji}</span>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: 'rgba(0, 212, 170, 0.2)',
                    border: '1px solid rgba(0, 212, 170, 0.3)',
                    color: '#00d4aa',
                  }}
                >
                  {article.category}
                </span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-sm text-white/40">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishDate}>
                  {new Date(article.publishDate).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </span>
              <button 
                className="ml-auto flex items-center gap-1 hover:text-white transition-colors"
                onClick={() => {
                  navigator.share?.({
                    title: article.title,
                    text: article.excerpt,
                    url: window.location.href,
                  });
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Title */}
            <h1 
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {article.title}
            </h1>
            <p className="text-white/50 text-lg mb-8">
              {article.subtitle}
            </p>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6"
          itemScope
          itemType="https://schema.org/Article"
        >
          <meta itemProp="headline" content={article.title} />
          <meta itemProp="description" content={article.excerpt} />
          <meta itemProp="datePublished" content={article.publishDate} />
          <meta itemProp="image" content={article.heroImage} />
          
          <div 
            className="max-w-3xl mx-auto p-6 md:p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="prose prose-invert prose-lg max-w-none" itemProp="articleBody">
              {article.content.map((paragraph, index) => (
                <div key={index} className="mb-4">
                  <Streamdown>{paragraph}</Streamdown>
                </div>
              ))}
            </div>
          </div>
        </motion.article>

        {/* FAQ Section - People Also Ask */}
        {article.faq && article.faq.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-6 mt-8"
          >
            <div 
              className="max-w-3xl mx-auto p-6 rounded-3xl"
              style={{
                background: 'rgba(0, 212, 170, 0.05)',
                border: '1px solid rgba(0, 212, 170, 0.2)',
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">❓</span>
                Întrebări Frecvente
              </h2>
              <div className="space-y-4">
                {article.faq.map((item, index) => (
                  <details 
                    key={index} 
                    className="group"
                    itemScope 
                    itemProp="mainEntity" 
                    itemType="https://schema.org/Question"
                  >
                    <summary 
                      className="cursor-pointer text-white font-medium py-3 px-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
                      style={{ listStyle: 'none' }}
                    >
                      <span itemProp="name">{item.question}</span>
                      <span className="text-[#00d4aa] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div 
                      className="px-4 pb-4 pt-2 text-white/70"
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                    >
                      <p itemProp="text">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-6 mt-6"
        >
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="px-6 mt-12"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00d4aa]" />
                Articole similare
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map(related => (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <div 
                      className="p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{related.emoji}</span>
                        <div>
                          <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-white/40 text-xs">
                            {related.readTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </main>

      <Navigation />
    </div>
  );
}
