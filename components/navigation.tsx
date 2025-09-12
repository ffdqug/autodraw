"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
              <Image src="/logo.png" alt="RimuDraw Logo" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              RimuDraw
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-blue-400 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-blue-400 transition-colors font-medium">
              About
            </Link>
            <Link href="/faq" className="text-foreground hover:text-blue-400 transition-colors font-medium">
              FAQ
            </Link>
            <Link href="/donation" className="text-foreground hover:text-blue-400 transition-colors font-medium">
              Donation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-blue-400 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-blue-400 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 text-foreground hover:text-blue-400 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/donation"
                className="block px-3 py-2 text-foreground hover:text-blue-400 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Donation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
