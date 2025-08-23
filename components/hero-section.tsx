import Link from "next/link"
import { ArrowRight, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <TrendingUp className="w-3 h-3 mr-1" />
                New Collection 2024
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Premium
                <span className="text-primary block">Products</span>
                with DevVoltz
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Experience the finest selection of electronics, fashion, and home essentials with DevVoltz. Curated for
                quality, designed for modern life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center">
                  4.9
                  <Star className="w-5 h-5 ml-1 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=600&width=500&text=DevVoltz+Premium+Products"
                alt="DevVoltz Premium Products"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Background Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
