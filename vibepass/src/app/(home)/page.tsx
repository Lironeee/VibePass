'use client'

import Image from "next/image"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Component() {
  const eventsRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: eventsRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-purple-900 text-white overflow-hidden">
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
                  "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,234.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 10,
                ease: "easeInOut"
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
            repeatType: "reverse"
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
            repeatType: "reverse"
          }}
        />

        {/* Additional Wave */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 opacity-40"
          style={{
            background: "linear-gradient(to bottom, transparent, #E6D5F2)",
            clipPath: "url(#wave2)"
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
                      "M0,0.5 C0.33,0.66 0.66,0.33 1,0.5 L1,1 L0,1 Z"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 8,
                    ease: "easeInOut"
                  }}
                />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
      </div>

      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture_decran_2024-11-01_a_13.01.02-removebg-preview-d2zcMqccZyweJGCCV2DNjoFZ4k3NO9.png"
              alt="VibePass Logo"
              width={120}
              height={30}
              className="h-8 w-auto brightness-0 invert"
            />
          </motion.div>
          <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
            <div className="w-full max-w-[400px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search for events, artists, or venues..."
                  className="pl-8 rounded-full bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors placeholder:text-white/50"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-white hover:bg-white/5 transition-colors">
                  Explore
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                <DropdownMenuItem className="focus:bg-white/10">Music</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">Arts</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">Sports</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-white text-black hover:bg-white/90 transition-colors">Sign In</Button>
          </div>
        </div>
      </motion.header>

      <main className="relative">
        <section className="container px-4 py-12 md:py-24 lg:py-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-center"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Get Your Ticket,
              <br />
              Create Memories
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-[600px] mx-auto text-white/70 text-xl"
            >
              Discover the best events near you. Your next unforgettable experience is just a click away.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="mt-8"
            >
              <Button 
                size="lg" 
                className="rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105"
              >
                Explore Events
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section className="container px-4 py-12 md:py-24 lg:py-32" ref={eventsRef}>
          <motion.div 
            style={{ opacity, scale }}
            className="space-y-12"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Popular Events</h2>
              <Button variant="ghost" className="text-white/70 hover:text-white">
                Paris
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-purple-500/50"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=300&width=400&text=Event${i}`}
                      alt={`Event ${i}`}
                      width={400}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Event Title {i}</h3>
                    <p className="text-sm text-white/70">Location • Date</p>
                    <div className="mt-4">
                      <Button className="w-full rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105">
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}