// Converts any regular Vimeo link (e.g. vimeo.com/123456 or vimeo.com/123456?fl=pl&fe=sh) into
// the player embed URL (player.vimeo.com/video/123456) that Vimeo actually allows inside an
// iframe — the regular share-page URL cannot be embedded and silently fails to load.
export function getVimeoEmbedUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (!match) return url;
  return `https://player.vimeo.com/video/${match[1]}`;
}
