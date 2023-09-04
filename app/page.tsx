"use client";

import Image from "next/image";
import { useState } from "react";

interface Card {
  back: CardFace;
  front: CardFace;
}

interface CardFace {
  imageSrc: string;
  text: string;
}

interface CardProps extends Card {
  flipped: boolean;
  setFlippedIndex: () => void;
  statefulFlipping: boolean;
}

interface CardFaceProps extends CardFace {
  face: "front" | "back";
}

interface StatefulFlippingToggleProps {
  setStatefulFlipping: (statefulFlipping: boolean) => void;
  statefulFlipping: boolean;
}

const cards: Card[] = Array(9)
  .fill(null)
  .map((_, index) => ({
    back: {
      imageSrc: "https://placehold.co/320x320/000000/FFFFFF/png",
      text: `Goodbye! Back of card number ${index}.`,
    },
    front: {
      imageSrc: "https://placehold.co/320x320/444444/FFFFFF/png",
      text: `Hello! Front of card number ${index}.`,
    },
  }));

function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
          Card Flip Animation in a React Component with Tailwind
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          I couldn&apos;t find a card flipping react component using tailwind,
          so here&apos;s one.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          By default cards flip on hover. However, if you want it to flip (and
          stay flipped) on mouse click instead flip the toggle below.
        </p>
      </div>
    </div>
  );
}

function StatefulFlippingToggle({
  setStatefulFlipping,
  statefulFlipping,
}: StatefulFlippingToggleProps) {
  return (
    <div className="flex items-center justify-between p-8">
      <span className="flex flex-grow flex-col">
        <span
          className="text-sm font-medium leading-6 text-gray-200"
          id="availability-label"
        >
          Click to flip cards
        </span>
        <span className="text-sm text-gray-500" id="availability-description">
          Cards will remain flipped until clicked again.
        </span>
      </span>
      {/* <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" --> */}
      <button
        type="button"
        onClick={() => setStatefulFlipping(!statefulFlipping)}
        className={`${
          statefulFlipping ? "bg-indigo-600" : "bg-gray-200"
        } ml-12 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
        role="switch"
        aria-checked="false"
        aria-labelledby="availability-label"
        aria-describedby="availability-description"
      >
        {/* <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" --> */}
        <span
          aria-hidden="true"
          className={`${
            statefulFlipping ? "translate-x-5" : "translate-x-0"
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        ></span>
      </button>
    </div>
  );
}

export default function Home() {
  const [flipped, setFlipped] = useState<boolean[]>(Array(9).fill(false));
  const [statefulFlipping, setStatefulFlipping] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-12">
      <Hero />
      <StatefulFlippingToggle
        statefulFlipping={statefulFlipping}
        setStatefulFlipping={setStatefulFlipping}
      />
      <ul
        role="list"
        className="mx-auto mt-10 grid max-w-2xl grid-cols-image-1 gap-x-8 gap-y-16 sm:grid-cols-image-2 lg:mx-0 lg:max-w-none lg:grid-cols-image-3"
      >
        {cards.map((card, index) => (
          <li key={card.front.text} className="mx-auto">
            <Card
              {...card}
              flipped={statefulFlipping && flipped[index]}
              statefulFlipping={statefulFlipping}
              setFlippedIndex={() =>
                statefulFlipping &&
                setFlipped([
                  ...flipped.slice(0, index),
                  !flipped[index],
                  ...flipped.slice(index + 1),
                ])
              }
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

function Card({
  back,
  front,
  flipped,
  setFlippedIndex,
  statefulFlipping,
}: CardProps) {
  return (
    <div
      className="position-relative [perspective:1000px] group"
      onClick={setFlippedIndex}
    >
      <div
        className={`relative w-80 h-96 [transform-style:preserve-3d] [transition:0.6s] ${
          !statefulFlipping ? "group-hover:rotate-y-180" : ""
        } ${
          flipped && statefulFlipping ? "rotate-y-180" : ""
        } rounded-2xl bg-gray-800 text-gray-300 ring-2 ring-white/10`}
      >
        <CardFace face="front" {...front} />
        <CardFace face="back" {...back} />
      </div>
    </div>
  );
}

function CardFace({ imageSrc, text, face }: CardFaceProps) {
  return (
    <div
      className={`[backface-visibility:hidden] w-80 h-96 absolute top-0 left-0 ${
        face === "front" ? "z-10 rotate-y-0" : "rotate-y-180"
      }`}
    >
      <Image
        className="w-full rounded-t-2xl object-cover"
        alt={text}
        src={imageSrc}
        width={320}
        height={320}
      />
      <p className="pt-5 px-4">{text}</p>
    </div>
  );
}
