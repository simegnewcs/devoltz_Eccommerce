"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal, getCartItems, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const cartItems = getCartItems()
  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax - discount

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1)
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(subtotal * 0.2)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            </div>
            <Link href="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart ({cartItems.length} items)</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productId}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors">{item.product.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stockCount}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-sm text-muted-foreground">Max {item.product.stockCount} available</span>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">{formatPrice(item.product.price * item.quantity)}</div>
                          <div className="text-sm text-muted-foreground">{formatPrice(item.product.price)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-500 bg-transparent">
                Clear Cart
              </Button>
              <Link href="/products">
                <Button variant="ghost">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Try: SAVE10 or WELCOME20</p>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground">
                    {shipping === 0 ? "Free shipping included!" : "Free shipping on orders over $50"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
