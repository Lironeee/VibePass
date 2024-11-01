'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Search, Filter, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function SecondaryMarket() {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = `${Math.random() * 100}vw`
      star.style.top = `${Math.random() * 100}vh`
      star.style.animationDuration = `${Math.random() * 3 + 2}s`
      document.getElementById('starry-background')?.appendChild(star)

      setTimeout(() => {
        star.remove()
      }, 5000)
    }

    const interval = setInterval(createStar, 200)
    return () => clearInterval(interval)
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  const tickets = [
    { id: 1, event: "DARKAVE", date: "Nov 13, 2024", price: 75, seller: "JohnD", originalPrice: 50 },
    { id: 2, event: "Techno Nights", date: "Dec 5, 2024", price: 120, seller: "AliceM", originalPrice: 100 },
    { id: 3, event: "Indie Rock Fest", date: "Jan 15, 2025", price: 90, seller: "BobS", originalPrice: 80 },
    { id: 4, event: "Jazz in the Park", date: "Feb 20, 2025", price: 60, seller: "EvaG", originalPrice: 55 },
  ]

  const filteredTickets = tickets.filter(ticket => 
    ticket.event.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
      {/* Starry Background */}
      <div id="starry-background" className="absolute inset-0 overflow-hidden pointer-events-none" />
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="container flex flex-col md:flex-row items-center justify-between py-4 md:py-6 space-y-4 md:space-y-0">
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
          <div className="flex flex-1 items-center justify-center md:justify-end space-x-4">
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
                <Button
                  variant="ghost"
                  className="gap-2 text-white hover:bg-white/5 transition-colors"
                >
                  Explore
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                <DropdownMenuItem className="focus:bg-white/10">
                  Music
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">
                  Arts
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">
                  Sports
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-white text-black hover:bg-white/90 transition-colors">
              Sign In
            </Button>
          </div>
        </div>
      </motion.header>
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
      </div>

      <div className="container px-4 py-8">
        {/* Breadcrumbs */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-white/60 mb-8"
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">Secondary Market</span>
        </motion.nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl font-bold tracking-tighter sm:text-5xl mb-8"
          >
            Secondary Market
          </motion.h1>

          <motion.div variants={fadeIn} className="flex justify-between items-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search for events..."
                className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="rounded-full text-black">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm" className="rounded-full">
                <Plus className="mr-2 h-4 w-4" />
                List a Ticket
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">{ticket.event}</CardTitle>
                  <CardDescription className="text-white/60">{ticket.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-white">R$ {ticket.price.toFixed(2)}</p>
                  <p className="text-sm text-white/60">Original Price: R$ {ticket.originalPrice.toFixed(2)}</p>
                  <p className="text-sm text-white/60">Seller: {ticket.seller}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full">Buy Now</Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </motion.div>
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
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}