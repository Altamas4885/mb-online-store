import { useEffect } from 'react';

/**
 * Minimal SEO helper that updates the document title and meta description
 * per page without pulling in a heavier head-management library.
 */
export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
