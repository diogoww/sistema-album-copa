import { LRUCache } from "lru-cache";

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000);
const max = Number(process.env.RATE_LIMIT_MAX ?? 60);

const cache = new LRUCache<string, { count: number; expiresAt: number }>({
  max: 5000
});

export function rateLimit(key: string) {
  const now = Date.now();
  const entry = cache.get(key);

  if (!entry || entry.expiresAt < now) {
    cache.set(key, { count: 1, expiresAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { ok: false, remaining: 0 };
  }

  entry.count += 1;
  cache.set(key, entry);
  return { ok: true, remaining: max - entry.count };
}
