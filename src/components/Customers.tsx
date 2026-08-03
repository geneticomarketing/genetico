"use client";

import { motion } from "framer-motion";
import { Reveal } from "./motion/reveal";

interface Logo {
  name: string;
  src: string;
}

const logos: Logo[] = [
  { name: "AIIMS Delhi", src: "/logos/customers/AIIMS Delhi.png" },
  { name: "BGCI", src: "/logos/customers/BGCI.png" },
  { name: "Birac", src: "/logos/customers/Birac.png" },
  { name: "CDFC", src: "/logos/customers/CDFC.png" },
  { name: "Gangaram Hospital", src: "/logos/customers/Gangaram Hospital.png" },
  { name: "JKEDI", src: "/logos/customers/JKEDI.png" },
  { name: "Purple Gene Clinic", src: "/logos/customers/Purple Gene Clinic.png" },
];

const repeated = [...logos, ...logos, ...logos];

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div className="mx-8 flex w-40 shrink-0 flex-col items-center gap-2">
      <img
        src={logo.src}
        alt={logo.name}
        className="h-36 w-36 rounded object-contain transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      />
      <span className="text-center text-[11px] leading-tight text-gray-400">{logo.name}</span>
    </div>
  );
}

function CarouselTrack({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex items-center"
        animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {repeated.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

export default function CustomersCarousel() {
  return (
    <section className="overflow-hidden bg-white py-20">
      <Reveal className="t-intro mx-auto mb-14 px-4 text-center">
        <h2
          className="mb-5 text-5xl font-light tracking-tight text-gray-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Customers &amp; Advisors
        </h2>
        <p className="t-subhead text-sm leading-relaxed text-gray-500">
          Genetico works with leading clinical institutions, Centres of Excellence, and ecosystem
          partners across rare disease care, research, and public health initiatives.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="relative flex flex-col gap-8">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
          <CarouselTrack reverse={false} />
          {/* <CarouselTrack reverse={true} /> */}
        </div>
      </Reveal>
    </section>
  );
}
