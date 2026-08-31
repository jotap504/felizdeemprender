import React from "react";
import { Composition, Folder } from "remotion";
import { TestimonialReel, TestimonialReelProps } from "./TestimonialReel";
import { ProgramTeaser, programTeaserDefaults } from "./ProgramTeaser";

const FPS = 30;

const testimonials: TestimonialReelProps[] = [
  {
    quote:
      "Sentía que estaba paralizado con algunos aspectos de mi vida laboral. Completé la escritura de una novela que tenía trabada hace un año y medio; ahora está en revisión.",
    name: "Alejandro Fotini",
    role: "Fotiá Consultoría Adaptativa",
  },
  {
    quote:
      "Estaba perdida, sentía que quería arrancar con mi negocio personal y no sabía por dónde. Hoy tengo clara mi marca, mi cliente ideal y en qué enfocar mis acciones.",
    name: "Mirta Encinas",
    role: "Bioexistencia Consciente",
  },
  {
    quote:
      "Me ayudaron a ver las herramientas con las que contaba y yo no sabía. Ari y Lu son muy empáticas y expertas.",
    name: "Julieta Kuhn",
    role: "Asistente online",
  },
  {
    quote:
      "En breve cumplimos 7 años y gran parte de nuestro crecimiento se lo debemos a B Process.",
    name: "Masami Shiira",
    role: "Amo mi Matcha",
  },
  {
    quote: "Vieron lo que yo no veía en mí, y me ayudaron a pensar en grande.",
    name: "Pao Barcini",
    role: "Emprendedora",
  },
  {
    quote: "Totalmente recomendables.",
    name: "Tere Zárate",
    role: "Libre Verte",
  },
];

// Reveal timing mirrors TestimonialReel.tsx: QUOTE_START(10) + words*4 + gap(14) + nameSpring(20) + hold(50) + fadeOut(20)
const durationForQuote = (quote: string) => {
  const words = quote.split(" ").length;
  return 10 + words * 4 + 14 + 20 + 50 + 20;
};

const slug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "");

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Testimonios">
        {testimonials.map((t) => (
          <Composition
            key={t.name}
            id={`Testimonio-${slug(t.name)}`}
            component={TestimonialReel}
            durationInFrames={durationForQuote(t.quote)}
            fps={FPS}
            width={1080}
            height={1920}
            defaultProps={t}
          />
        ))}
      </Folder>
      <Folder name="Teasers">
        <Composition
          id="Teaser-EscalaEstrategica"
          component={ProgramTeaser}
          durationInFrames={300}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={programTeaserDefaults}
        />
      </Folder>
    </>
  );
};
