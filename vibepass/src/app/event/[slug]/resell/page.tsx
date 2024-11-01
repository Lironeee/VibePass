"use client";

import Link from "next/link";
import { ChevronRight, Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/header";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function EventSecondaryMarket() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price_asc");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
    }[] = [];
    const numStars = 100;
    const colorPalette = ["#ffffff", "#ffe9c4", "#d4fbff"];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        ctx.fill();

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
      });
    }

    function animate() {
      drawStars();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tickets = [
    { id: 1, section: "VIP", row: "A", seat: "1", price: 350, seller: "JohnD" },
    {
      id: 2,
      section: "Floor",
      row: "B",
      seat: "5",
      price: 280,
      seller: "AliceM",
    },
    {
      id: 3,
      section: "Lower Bowl",
      row: "C",
      seat: "10",
      price: 220,
      seller: "BobS",
    },
    {
      id: 4,
      section: "Upper Bowl",
      row: "D",
      seat: "15",
      price: 180,
      seller: "EvaG",
    },
    { id: 5, section: "VIP", row: "B", seat: "3", price: 330, seller: "SamT" },
    {
      id: 6,
      section: "Floor",
      row: "C",
      seat: "7",
      price: 270,
      seller: "LilaK",
    },
  ];

  const filteredTickets = tickets
    .filter(
      (ticket) =>
        ticket.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.seller.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white overflow-hidden">
      <Header />
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Nebula Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,6,115,0.2),transparent_50%)] opacity-75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,182,0.2),transparent_50%)] opacity-75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,255,0.2),transparent_50%)] opacity-75" />

        {/* Animated Nebula Clouds */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-screen filter blur-[130px] opacity-15"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container px-4 py-8 relative z-10" ref={containerRef}>
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
          <span className="text-white">DARKAVE Secondary Market</span>
        </motion.nav>

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
        >
          <motion.div variants={fadeIn} className="mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
              DARKAVE
            </h1>
            <p className="text-xl text-white/70 mb-4">Secondary Market</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Tickets Available
              </div>
              <div>Wed, Nov 13 • 03:00 - 08:00</div>
              <div>Aracaju, SE, Brasil</div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search by section or seller..."
                className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-purple-500/20 text-white border-purple-500/50 hover:bg-purple-500/30 hover:text-white"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                  <DropdownMenuItem className="focus:bg-white/10">
                    VIP
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10">
                    Floor
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10">
                    Lower Bowl
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10">
                    Upper Bowl
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-purple-500/20 text-white border-purple-500/50 hover:bg-purple-500/30 hover:text-white"
                  >
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onSelect={() => setSortBy("price_asc")}
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onSelect={() => setSortBy("price_desc")}
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            style={{ opacity, scale }}
          >
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-colors backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="text-white">{ticket.section}</CardTitle>
                  <CardDescription className="text-white/60">
                    Row {ticket.row}, Seat {ticket.seat}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-white">
                    R$ {ticket.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-white/60">
                    Seller: {ticket.seller}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white">
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
