"use client"

import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  const { addItem } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="relative md:w-64 h-64 md:h-48 flex-shrink-0">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-red-500">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Heart className="w-5 h-5" />
                        </Button>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{product.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">({product.reviewCount} reviews)</span>
                        </div>
                        <div className="flex gap-1">
                          {product.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Button onClick={() => addItem(product.id)} className="ml-4">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                <Heart className="w-4 h-4" />
              </Button>
              {product.originalPrice && (
                <Badge className="absolute top-3 left-3 bg-red-500">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
              {product.tags.includes("bestseller") && (
                <Badge className="absolute bottom-3 left-3 bg-green-500">Bestseller</Badge>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
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
            <Button className="w-full" onClick={() => addItem(product.id)}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
