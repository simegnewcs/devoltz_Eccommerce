"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(() => `ORD-${Date.now().toString().slice(-8)}`)

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">Order Number: {orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email shortly with tracking information.
              </p>
            </div>
          </div>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Payment Processed</h4>
                    <p className="text-sm text-muted-foreground">Your payment has been successfully processed</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Order Processing</h4>
                    <p className="text-sm text-muted-foreground">We're preparing your items for shipment</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Shipping Soon</h4>
                    <p className="text-sm text-muted-foreground">Expected to ship within 1-2 business days</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Link href="/dashboard">
                  <Button className="w-full">Track Your Order</Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Need help with your order?</p>
            <Link href="/contact" className="text-sm text-primary hover:underline">
              Contact our support team
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
