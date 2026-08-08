export default function SoccerVideo() {
  return (
    <>
      <svg width="0" height="0" className="absolute">
        <filter id="soccer-video-alpha" colorInterpolationFilters="sRGB">
          {/* Passes RGB through unchanged and derives alpha from luminance,
              so the white background becomes transparent and only the
              (already red) silhouette stays opaque — no blend-mode needed. */}
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1.9327 -6.5018 -0.6564 0 3.1818"
          />
        </filter>
      </svg>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        style={{ filter: "url(#soccer-video-alpha)" }}
      >
        <source src="/videos/soccer-juggle.mp4" type="video/mp4" />
      </video>
    </>
  );
}
