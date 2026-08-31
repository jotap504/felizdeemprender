import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadLibreFranklin } from "@remotion/google-fonts/LibreFranklin";

const { fontFamily: fraunces } = loadFraunces("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});
const { fontFamily: libreFranklin } = loadLibreFranklin("normal", {
  weights: ["400", "700", "800"],
  subsets: ["latin"],
});

const PLUM_DEEP = "#2B0A28";
const GOLD_BRIGHT = "#DDB65B";

export type ProgramTeaserProps = {
  eyebrow: string;
  headline: string;
  bullets: string[];
  priceAnchor: string;
  priceNow: string;
  cta: string;
};

export const programTeaserDefaults: ProgramTeaserProps = {
  eyebrow: "Para consultores, agencias y solopreneurs",
  headline: "Facturás bien. Pero seguís siendo el límite de tu propio negocio.",
  bullets: ["Liberar tu tiempo", "Crecimiento predecible", "Delegación efectiva"],
  priceAnchor: "$1.200.000",
  priceNow: "$600.000",
  cta: "Inscribirme a Escala Estratégica",
};

const useFadeUp = (startFrame: number, duration = 20) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200 },
    durationInFrames: duration,
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `translateY(${translateY}px)` };
};

const HeadlineScene: React.FC<{ eyebrow: string; headline: string }> = ({
  eyebrow,
  headline,
}) => {
  const eyebrowStyle = useFadeUp(0);
  const headlineStyle = useFadeUp(10);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: PLUM_DEEP,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 110px",
      }}
    >
      <div
        style={{
          ...eyebrowStyle,
          fontFamily: libreFranklin,
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: GOLD_BRIGHT,
          marginBottom: 28,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          ...headlineStyle,
          fontFamily: fraunces,
          fontWeight: 600,
          fontSize: 74,
          lineHeight: 1.15,
          color: "#ffffff",
        }}
      >
        {headline}
      </div>
    </AbsoluteFill>
  );
};

const BulletsScene: React.FC<{ bullets: string[] }> = ({ bullets }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: PLUM_DEEP,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 36,
        padding: "0 110px",
      }}
    >
      <div
        style={{
          fontFamily: libreFranklin,
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: GOLD_BRIGHT,
          marginBottom: 8,
        }}
      >
        Lo que vas a lograr
      </div>
      {bullets.map((bullet, i) => {
        const style = useFadeUp(i * 18);
        return (
          <div
            key={bullet}
            style={{
              ...style,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: GOLD_BRIGHT,
                flexShrink: 0,
              }}
            />
            <div
              style={{
                fontFamily: fraunces,
                fontWeight: 500,
                fontSize: 52,
                color: "#ffffff",
              }}
            >
              {bullet}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const PriceScene: React.FC<{
  priceAnchor: string;
  priceNow: string;
  cta: string;
}> = ({ priceAnchor, priceNow, cta }) => {
  const rowStyle = useFadeUp(0);
  const ctaStyle = useFadeUp(24);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: PLUM_DEEP,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ ...rowStyle, display: "flex", alignItems: "baseline", gap: 26 }}>
        <span
          style={{
            fontFamily: libreFranklin,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.4)",
            textDecoration: "line-through",
          }}
        >
          {priceAnchor}
        </span>
        <span
          style={{
            fontFamily: fraunces,
            fontWeight: 600,
            fontSize: 108,
            color: GOLD_BRIGHT,
          }}
        >
          {priceNow}
        </span>
      </div>
      <div
        style={{
          ...ctaStyle,
          marginTop: 56,
          fontFamily: libreFranklin,
          fontWeight: 800,
          fontSize: 34,
          background: GOLD_BRIGHT,
          padding: "24px 56px",
          borderRadius: 2,
        }}
      >
        <span style={{ color: PLUM_DEEP }}>{cta}</span>
      </div>
    </AbsoluteFill>
  );
};

export const ProgramTeaser: React.FC<ProgramTeaserProps> = ({
  eyebrow,
  headline,
  bullets,
  priceAnchor,
  priceNow,
  cta,
}) => {
  return (
    <>
      <Sequence from={0} durationInFrames={90}>
        <HeadlineScene eyebrow={eyebrow} headline={headline} />
      </Sequence>
      <Sequence from={90} durationInFrames={110}>
        <BulletsScene bullets={bullets} />
      </Sequence>
      <Sequence from={200} durationInFrames={100}>
        <PriceScene priceAnchor={priceAnchor} priceNow={priceNow} cta={cta} />
      </Sequence>
    </>
  );
};
