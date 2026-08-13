// Converts any regular Vimeo link (e.g. vimeo.com/123456 or vimeo.com/123456?fl=pl&fe=sh) into
// the player embed URL (player.vimeo.com/video/123456) that Vimeo actually allows inside an
// iframe — the regular share-page URL cannot be embedded and silently fails to load.
export function getVimeoEmbedUrl(
  url?: string,
  options?: { autoplay?: boolean; loop?: boolean }
): string | undefined {
  if (!url) return undefined;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const id = match?.[1];
  if (!id) return url;

  const params = new URLSearchParams();
  if (options?.autoplay) params.set('autoplay', '1');
  // Looping suppresses Vimeo's own "More from..." end screen — the video just restarts instead.
  if (options?.loop) params.set('loop', '1');

  const query = params.toString();
  return `https://player.vimeo.com/video/${id}${query ? `?${query}` : ''}`;
}
