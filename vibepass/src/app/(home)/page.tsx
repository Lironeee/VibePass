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
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/taylor-swift-eras-tour-RWNXzWLHGXeZrbRr8Cj8Iy3wqLNGKP.jpg",
  },
  {
    id: 2,
    title: "Beyoncé | Renaissance World Tour",
    location: "Tottenham Hotspur Stadium, London",
    date: "May 29, 2024",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beyonce-renaissance-tour-0Hs7Fy9Ue8Ij9Aq1Yl5Nt5Wd5Hs3Kl.jpg",
  },
  {
    id: 3,
    title: "Ed Sheeran | Mathematics Tour",
    location: "MetLife Stadium, New Jersey",
    date: "June 10, 2024",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ed-sheeran-mathematics-tour-7Hs9Fy2Ue1Ij4Aq7Yl8Nt2Wd1Hs7Kl.jpg",
  },
  {
    id: 4,
    title: "BTS | Yet To Come",
    location: "Allegiant Stadium, Las Vegas",
    date: "April 8, 2024",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bts-yet-to-come-2Hs5Fy7Ue3Ij1Aq9Yl6Nt8Wd3Hs1Kl.jpg",
  },
  {
    id: 5,
    title: "Adele | Weekends with Adele",
    location: "The Colosseum at Caesars Palace, Las Vegas",
    date: "July 15, 2024",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adele-weekends-with-adele-5Hs2Fy1Ue7Ij6Aq3Yl2Nt1Wd9Hs5Kl.jpg",
  },
  {
    id: 6,
    title: "Coldplay | Music of the Spheres World Tour",
    location: "Wembley Stadium, London",
    date: "August 20, 2024",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coldplay-music-of-the-spheres-8Hs4Fy5Ue2Ij8Aq5Yl1Nt7Wd6Hs9Kl.jpg",
  },
];

export default function Component() {
  const eventsRef = useRef(null);
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-purple-900 text-white overflow-hidden">
      {/* Starry Background */}
      <div
        id="starry-background"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Wave SVG */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 1440 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,277.3C672,288,768,288,864,277.3C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#gradient1)"
              animate={{
                d: [
                  "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,277.3C672,288,768,288,864,277.3C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,234.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 10,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E6D5F2" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#E6D5F2" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F0E6FA" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#E6D5F2,transparent_70%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#F0E6FA,transparent_70%)] opacity-40" />

        {/* Animated Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[64px] opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[64px] opacity-40"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Additional Wave */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 opacity-40"
          style={{
            background: "linear-gradient(to bottom, transparent, #E6D5F2)",
            clipPath: "url(#wave2)",
          }}
        >
          <svg width="0" height="0">
            <defs>
              <clipPath id="wave2" clipPathUnits="objectBoundingBox">
                <motion.path
                  d="M0,0.5 C0.33,0.33 0.66,0.66 1,0.5 L1,1 L0,1 Z"
                  animate={{
                    d: [
                      "M0,0.5 C0.33,0.33 0.66,0.66 1,0.5 L1,1 L0,1 Z",
                      "M0,0.5 C0.33,0.66 0.66,0.33 1,0.5 L1,1 L0,1 Z",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 8,
                    ease: "easeInOut",
                  }}
                />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
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
              >
                Explore Events
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section
          className="container px-4 py-12 md:py-24 lg:py-32"
          ref={eventsRef}
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={400}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-white/70">
                      {event.location} • {event.date}
                    </p>
                    <div className="mt-4">
                      <Link href={`/event/${event.id}`}>
                        <Button className="w-full rounded-full bg-white text-black  hover:bg-white/90 transition-all hover:scale-105">
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
