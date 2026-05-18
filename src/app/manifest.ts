import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Album Copa",
    short_name: "AlbumCopa",
    description: "Controle completo de figurinhas da Copa do Mundo",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: "#5bbf7f",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
