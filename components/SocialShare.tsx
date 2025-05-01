'use client';
import { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function SocialShare() {
  const [shareUrl, setShareUrl] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState(
    'Free tool to generate QR codes instantly!'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);

      // Get headline from <h1> tag
      const foundHeadline =
        document.querySelector('h1')?.textContent ||
        'Check out this awesome tool!';
      setHeadline(foundHeadline);
    }
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${headline} - ${description}`);

  return (
    <div className="flex items-center gap-4 mt-6">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        <FaTwitter className="text-sky-500 text-2xl hover:scale-110 transition" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="text-blue-700 text-2xl hover:scale-110 transition" />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className="text-green-600 text-2xl hover:scale-110 transition" />
      </a>
    </div>
  );
}
