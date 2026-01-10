import { useState } from "react";
import { Share2, Facebook, Twitter, MessageCircle, Link2, Check, X } from "lucide-react";

interface ShareButtonProps {
  title: string;
  description: string;
  url?: string;
  hashtags?: string[];
  className?: string;
}

export default function ShareButton({ 
  title, 
  description, 
  url = window.location.href,
  hashtags = ["Khora", "NutritieVegana", "PlantBased"],
  className = ""
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.join(",");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagString}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        setIsOpen(false);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        title="Distribuie"
      >
        <Share2 className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute right-0 top-full mt-2 z-50 bg-[#1a2744] border border-white/10 rounded-xl shadow-xl p-3 min-w-[200px]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-white/80 text-sm font-medium">Distribuie</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => handleShare("facebook")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Facebook className="w-5 h-5 text-[#1877F2]" />
                <span className="text-white/90 text-sm">Facebook</span>
              </button>
              
              <button
                onClick={() => handleShare("twitter")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                <span className="text-white/90 text-sm">Twitter / X</span>
              </button>
              
              <button
                onClick={() => handleShare("whatsapp")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span className="text-white/90 text-sm">WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleShare("linkedin")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-white/90 text-sm">LinkedIn</span>
              </button>
              
              <div className="border-t border-white/10 my-2" />
              
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 text-sm">Link copiat!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-5 h-5 text-white/60" />
                    <span className="text-white/90 text-sm">Copiază link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
