export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  tags: string[]
  features: string[]
  specifications: Record<string, string>
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "customer" | "admin"
  addresses: Address[]
  createdAt: string
}

export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  selectedVariant?: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  selectedVariant?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  description: string
}
