import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadLibreFranklin } from "@remotion/google-fonts/LibreFranklin";

const { fontFamily: fraunces } = loadFraunces("normal", {
  weights: ["500", "600"],
  subsets: ["latin"],
});
const { fontFamily: libreFranklin } = loadLibreFranklin("normal", {
  weights: ["400", "700", "800"],
  subsets: ["latin"],
});

const PLUM_DEEP = "#2B0A28";
const GOLD_BRIGHT = "#DDB65B";

export type TestimonialReelProps = {
  quote: string;
  name: string;
  role: string;
};

export const testimonialReelDefaults: TestimonialReelProps = {
  quote:
    "Vieron lo que yo no veía en mí, y me ayudaron a pensar en grande.",
  name: "Pao Barcini",
  role: "Emprendedora",
};

const Word: React.FC<{ word: string; index: number; startFrame: number }> = ({
  word,
  index,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = startFrame + index * 4;
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 18,
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        transform: `translateY(${translateY}px)`,
        marginRight: 14,
      }}
    >
      {word}
    </span>
  );
};

export const TestimonialReel: React.FC<TestimonialReelProps> = ({
  quote,
  name,
  role,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const words = quote.split(" ");

  const quoteMarkSpring = spring({ frame, fps, config: { damping: 12 } });
  const quoteMarkScale = interpolate(quoteMarkSpring, [0, 1], [0.6, 1]);
  const quoteMarkOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const QUOTE_START = 10;
  const nameStart = QUOTE_START + words.length * 4 + 14;
  const nameSpring = spring({
    frame: frame - nameStart,
    fps,
    config: { damping: 200 },
    durationInFrames: 20,
  });
  const nameOpacity = interpolate(nameSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameY = interpolate(nameSpring, [0, 1], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const outStart = durationInFrames - 20;
  const outOpacity = interpolate(
    frame,
    [outStart, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) },
  );

  const brandOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: PLUM_DEEP,
        opacity: outOpacity,
        padding: "120px 96px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 96,
          opacity: brandOpacity,
          fontFamily: fraunces,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 34,
          color: "#ffffff",
        }}
      >
        Feliz de Emprender
        <div
          style={{
            fontFamily: libreFranklin,
            fontStyle: "normal",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: GOLD_BRIGHT,
            marginTop: 6,
          }}
        >
          Mentoras de emprendedoras
        </div>
      </div>

      <div
        style={{
          fontFamily: fraunces,
          fontSize: 160,
          lineHeight: 1,
          color: GOLD_BRIGHT,
          opacity: quoteMarkOpacity,
          transform: `scale(${quoteMarkScale})`,
          transformOrigin: "left center",
        }}
      >
        &ldquo;
      </div>

      <div
        style={{
          fontFamily: fraunces,
          fontWeight: 500,
          fontSize: 56,
          lineHeight: 1.28,
          color: "#ffffff",
          marginTop: 8,
        }}
      >
        {words.map((word, i) => (
          <Word key={i} word={word} index={i} startFrame={QUOTE_START} />
        ))}
      </div>

      <div
        style={{
          marginTop: 56,
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: libreFranklin,
            fontWeight: 800,
            fontSize: 30,
            color: "#ffffff",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: libreFranklin,
            fontWeight: 400,
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            marginTop: 6,
          }}
        >
          {role}
        </div>
      </div>
    </AbsoluteFill>
  );
};
