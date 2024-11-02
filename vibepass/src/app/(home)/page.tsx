"use client";

import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Header from "@/components/header";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const realEvents = [
  {
    id: 1,
    title: "Taylor Swift | The Eras Tour",
    location: "SoFi Stadium, Los Angeles",
    date: "August 3, 2024",
    imageUrl:
      "https://mmc.tirto.id/image/2023/06/26/poster-taylor-swift-1_ratio-16x9.jpg",
  },
  {
    id: 2,
    title: "Beyoncé | Renaissance World Tour",
    location: "Tottenham Hotspur Stadium, London",
    date: "May 29, 2024",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWBPUDLnCqLgOHgW8xYxoeK-o_ehpyjD3lmg&s",
  },
  {
    id: 3,
    title: "Ed Sheeran | Mathematics Tour",
    location: "MetLife Stadium, New Jersey",
    date: "June 10, 2024",
    imageUrl:
      "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/555/2024/07/06/Untitled-Project-49-990537325.jpg",
  },
  {
    id: 4,
    title: "BTS | Yet To Come",
    location: "Allegiant Stadium, Las Vegas",
    date: "April 8, 2024",
    imageUrl:
      "https://m.media-amazon.com/images/S/pv-target-images/3a67a41763649d8e1c3bc550d8f07c7dd652df6a9da0b47a46d090f1e0c7cfa8.png",
  },
  {
    id: 5,
    title: "Adele | Weekends with Adele",
    location: "The Colosseum at Caesars Palace, Las Vegas",
    date: "July 15, 2024",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5f343ff9541cd11433040eca/cc9107f3-dac2-4ea9-ad39-1b133078ba48/Weekends+with+Adele+%28The+Las+Vegas+Final+Shows%29%2C+Adele+Las+Vegas+Tickets%2C+Colosseum+at+Caesars+Palace%2C+Las+Vegas+Events%2C+Above+%2B+Beyond",
  },
  {
    id: 6,
    title: "Coldplay | Music of the Spheres World Tour",
    location: "Wembley Stadium, London",
    date: "August 20, 2024",
    imageUrl:
      "https://media.karousell.com/media/photos/products/2023/7/12/coldplay_music_of_the_spheres__1689160503_324d5de3.jpg",
  },
];

export default function Component() {
  const eventsRef = useRef(null); // Reference to Popular Events section
  const { scrollYProgress } = useScroll({
    target: eventsRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  useEffect(() => {
    const createStar = () => {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      const starryBackground = document.getElementById("starry-background");
      if (starryBackground) {
        starryBackground.appendChild(star);
      }

      setTimeout(() => {
        star.remove();
      }, 5000);
    };

    const interval = setInterval(createStar, 200);

    return () => clearInterval(interval);
  }, []);

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-purple-900 text-white overflow-hidden">
      {/* Starry Background */}
      <div
        id="starry-background"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* (SVG and other background elements remain the same) */}
      </div>

      <Header />

      <main className="relative w-full flex flex-col items-center">
        <section className="container px-4 py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold text-center tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Get Your Ticket,
              <br />
              Create Memories
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-[600px] mx-auto text-white/70 text-xl"
            >
              Discover the best events near you. Your next unforgettable
              experience is just a click away.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8">
              <Button
                size="lg"
                className="rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105"
                onClick={scrollToEvents}
              >
                Explore Events
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section
          className="container px-4 py-12 md:py-24 lg:py-32"
          ref={eventsRef} // This is where we scroll to
        >
          <motion.div style={{ opacity, scale }} className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Popular Events
              </h2>
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white"
              >
                All Cities
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {realEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: event.id * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-purple-500/50"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      layout="responsive"
                      width={700}
                      height={400}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl">{event.title}</h3>
                    <p className="text-sm text-white/70 mt-2">
                      {event.location} • {event.date}
                    </p>
                    <div className="mt-6">
                      <Link href={`/event/${event.id}`}>
                        <Button className="w-full rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105">
                          Get Tickets
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <style jsx global>{`
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }

        @keyframes twinkle {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
