'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function RefinedGradientHeader() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative h-24 overflow-hidden bg-gradient-to-r from-[#d9b8f9] via-[#b79789] to-[#947619]">
        <svg
          className="absolute bottom-0 left-0 w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(217,184,249,0.3)" />
              <stop offset="50%" stopColor="rgba(183,151,137,0.3)" />
              <stop offset="100%" stopColor="rgba(148,118,25,0.3)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d={`M0,${64 + scrollY * 0.1} 
               C320,${96 + scrollY * 0.15} 
                 720,${32 + scrollY * 0.05} 
                 1440,${64 + scrollY * 0.1} 
               V${320} H0 Z`}
          >
            <animate 
              attributeName="d" 
              values={`
                M0,${64 + scrollY * 0.1} C320,${96 + scrollY * 0.15} 720,${32 + scrollY * 0.05} 1440,${64 + scrollY * 0.1} V${320} H0 Z;
                M0,${72 + scrollY * 0.1} C320,${88 + scrollY * 0.15} 720,${40 + scrollY * 0.05} 1440,${72 + scrollY * 0.1} V${320} H0 Z;
                M0,${64 + scrollY * 0.1} C320,${96 + scrollY * 0.15} 720,${32 + scrollY * 0.05} 1440,${64 + scrollY * 0.1} V${320} H0 Z
              `}
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div className="container relative flex h-full items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full filter blur-sm"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture_decran_2024-11-01_a_13.01.02-W5RreiRP9wkDyKNQzw4BNhOU9XYcwp.png"
                alt="VIBEPASS Logo"
                width={140}
                height={50}
                className="h-10 w-auto relative"
                priority
              />
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {['About', 'Events', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-base font-medium text-white hover:text-[#947619] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#947619] transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Button
              className="bg-[#947619] text-white hover:bg-[#d9b8f9] hover:text-[#947619] transition-colors shadow-lg shadow-[#947619]/20 text-base px-6 py-2"
            >
              Get Started
            </Button>
          </nav>
          <Button
            variant="ghost"
            className="md:hidden text-white hover:bg-white/20"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-[#d9b8f9] via-[#b79789] to-[#947619] backdrop-blur-md">
          <nav className="container py-4">
            {['About', 'Events', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block py-2 text-base font-medium text-white hover:text-[#947619] transition-colors"
              >
                {item}
              </Link>
            ))}
            <Button
              className="mt-4 w-full bg-[#947619] text-white hover:bg-[#d9b8f9] hover:text-[#947619] transition-colors shadow-lg shadow-[#947619]/20 text-base px-6 py-2"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}