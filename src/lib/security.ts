import sanitizeHtml from "sanitize-html";

export function sanitizeText(input: string) {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  }).trim();
}

export const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
};
