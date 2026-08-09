import { MessageCircle, Youtube, Facebook } from "lucide-react";
import { COMPANY } from "@/data/site";
import { useState, useRef, useEffect } from "react";

// Custom X (Twitter) Logo Component
function XIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom WhatsApp Logo Component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function WhatsAppButton() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = 'ontouchstart' in window || window.innerWidth < 1024;
      setIsTouchDevice(isTouch);
    };
    
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const whatsappHref = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hi HappyLamb Production, I'd like a quote for a shoot.",
  )}`;

  // PC / Desktop Hover Options (WhatsApp is the Main Button, so it is NOT in this list)
  const desktopHoverLinks = [
    {
      icon: Youtube,
      href: COMPANY.youtube || "https://youtube.com",
      bg: "bg-red-100",
      iconColor: "text-[#FF0000]",
      hoverBg: "hover:bg-red-500 hover:text-white",
    },
    {
      icon: Facebook,
      href: COMPANY.facebook || "https://facebook.com",
      bg: "bg-blue-100",
      iconColor: "text-[#1877F2]",
      hoverBg: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: XIcon,
      href: COMPANY.twitter || "https://twitter.com",
      bg: "bg-gray-100",
      iconColor: "text-black dark:text-white",
      hoverBg: "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
    },
  ];

  // Mobile / Tablet Click Options (WhatsApp is listed here so it opens on click)
  const touchClickLinks = [
    ...desktopHoverLinks,
    {
      icon: WhatsAppIcon,
      href: whatsappHref,
      bg: "bg-green-100",
      iconColor: "text-[#25D366]",
      hoverBg: "hover:bg-[#25D366] hover:text-white",
    },
  ];

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleSocialClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isTouchDevice) setIsOpen(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (isTouchDevice) {
      setIsOpen(!isOpen);
    } else {
      // On PC, clicking the button directly opens WhatsApp
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isTouchDevice && isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTouchDevice, isOpen]);

  const currentLinks = isTouchDevice ? touchClickLinks : desktopHoverLinks;

  return (
    <div 
      ref={containerRef}
      className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Menu Items Container */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        {currentLinks.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              onClick={(e) => handleSocialClick(e, social.href)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${social.bg} ${social.iconColor} ${social.hoverBg}`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <IconComponent className="h-6 w-6" />
            </a>
          );
        })}
      </div>

      {/* Main FAB Button */}
      <div className="relative">
        <button
          onClick={handleMainClick}
          className={`flex items-center justify-center rounded-full p-4 text-white shadow-2xl transition-all duration-300 hover:scale-110 ${
            isTouchDevice 
              ? "bg-primary hover:shadow-primary/50" 
              : "bg-[#25D366] hover:shadow-[#25D366]/50"
          } ${isOpen ? "scale-95" : ""}`}
        >
          {/* 
             FIX: On PC (Touch Device false), ALWAYS show WhatsApp Icon. 
             On Mobile/Tablet (Touch Device true), Show Menu Icon. 
          */}
          {isTouchDevice ? (
            <MessageCircle className="h-6 w-6" />
          ) : (
            <WhatsAppIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}