"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/mock-data"
import { useCart } from "@/lib/cart-context"

export function FeaturedProducts() {
  const { addItem } = useCart()

  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium products that DevVoltz customers love most
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                  {product.tags.includes("bestseller") && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Bestseller</Badge>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full group hover:bg-primary/90 transition-colors"
                  onClick={() => addItem(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
