// Converts any regular Vimeo link (e.g. vimeo.com/123456 or vimeo.com/123456?fl=pl&fe=sh) into
// the player embed URL (player.vimeo.com/video/123456) that Vimeo actually allows inside an
// iframe — the regular share-page URL cannot be embedded and silently fails to load.
export function getVimeoEmbedUrl(
  url?: string,
  options?: { autoplay?: boolean; loop?: boolean; muted?: boolean }
): string | undefined {
  if (!url) return undefined;
  const id = getVimeoVideoId(url);
  if (!id) return url;

  const params = new URLSearchParams();
  if (options?.autoplay) params.set('autoplay', '1');
  // Looping suppresses Vimeo's own "More from..." end screen — the video just restarts instead.
  if (options?.loop) params.set('loop', '1');
  if (options?.muted) params.set('muted', '1');

  const query = params.toString();
  return `https://player.vimeo.com/video/${id}${query ? `?${query}` : ''}`;
}

export function getVimeoVideoId(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1];
}

export interface VimeoMeta {
  ratio: number;
  thumbnailUrl?: string;
}

// Vimeo's public oEmbed endpoint reports each video's real width/height (so a portrait or
// square video can size its own player to its true shape instead of being forced into a 16:9
// box) and a cover thumbnail (used as a blurred backdrop behind the letterboxed player). Falls
// back to a plain 16:9/no-thumbnail result whenever the lookup fails — offline, blocked, or a
// non-Vimeo/malformed URL.
export async function fetchVimeoMeta(url?: string): Promise<VimeoMeta> {
  const fallback: VimeoMeta = { ratio: 16 / 9 };
  const id = getVimeoVideoId(url);
  if (!id) return fallback;

  try {
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}`);
    if (!res.ok) return fallback;
    const data = await res.json();
    return {
      ratio: data.width && data.height ? data.width / data.height : fallback.ratio,
      thumbnailUrl: data.thumbnail_url,
    };
  } catch {
    return fallback;
  }
}
