"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  MapPin,
  Heart,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Component() {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.getElementById("starry-background")?.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 5000);
    };

    const interval = setInterval(createStar, 200);
    return () => clearInterval(interval);
  }, []);

  const [isInterested, setIsInterested] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
      {/* Starry Background */}
      <div
        id="starry-background"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      <Header />
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
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
      </div>

      <div className="container px-4 py-8">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-white/60 mb-8"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/events" className="hover:text-white transition-colors">
            Events
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">Darkave</span>
        </motion.nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Event Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="space-y-6"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl font-bold tracking-tighter sm:text-5xl"
            >
              DARKAVE
            </motion.h1>

            <motion.div variants={fadeIn} className="text-white/60">
              By Purple
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                <span>Wed, Nov 13 • 03:00 - 08:00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span>Aracaju, SE, Brasil</span>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex gap-4">
              <Button
                size="lg"
                className="rounded-full bg-white text-black hover:bg-white/90"
              >
                Get Tickets Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/10 hover:bg-white/10"
                onClick={() => setIsInterested(!isInterested)}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    isInterested ? "fill-current text-black" : "text-black"
                  }`}
                />
                {isInterested ? (
                  <span className="text-black">Interested</span>
                ) : (
                  <span className="text-black">Show Interest</span>
                )}
              </Button>
            </motion.div>

            {/* Compact Tickets Section */}
            <motion.div variants={fadeIn} className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                <div>
                  <h3 className="text-white font-medium">Free Registration</h3>
                  <p className="text-sm text-white/60">Basic entry</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">R$ 0.00</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full hover:bg-white/10"
                  >
                    Select
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                <div>
                  <h3 className="text-white font-medium">VIP Access</h3>
                  <p className="text-sm text-white/60">Premium experience</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">R$ 150.00</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full hover:bg-white/10"
                  >
                    Select
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                <div>
                  <h3 className="text-white font-medium">Donation Entry</h3>
                  <p className="text-sm text-white/60">Support the event</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">From R$ 5.00</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full hover:bg-white/10"
                  >
                    Select
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Event Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt="Event poster"
              width={400}
              height={600}
              className="rounded-xl border border-white/10 object-cover"
            />
          </motion.div>
        </div>
      </div>

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
