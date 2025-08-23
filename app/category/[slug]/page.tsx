"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter, Grid, List } from "lucide-react"
import { products, categories } from "@/lib/mock-data"

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.slug as string

  const category = categories.find((cat) => cat.slug === categorySlug)
  const categoryProducts = products.filter((product) => (category ? product.category === category.name : false))

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = useMemo(() => {
    const filtered = categoryProducts.filter((product) => {
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      if (selectedSubcategory && product.subcategory !== selectedSubcategory) {
        return false
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      if (product.rating < minRating) {
        return false
      }

      return true
    })

    // Apply sorting logic (same as products page)
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        filtered.sort((a, b) => {
          const aScore =
            (a.tags.includes("bestseller") ? 3 : 0) +
            (a.tags.includes("premium") ? 2 : 0) +
            (a.tags.includes("new") ? 1 : 0)
          const bScore =
            (b.tags.includes("bestseller") ? 3 : 0) +
            (b.tags.includes("premium") ? 2 : 0) +
            (b.tags.includes("new") ? 1 : 0)
          return bScore - aScore
        })
    }

    return filtered
  }, [categoryProducts, searchQuery, selectedSubcategory, priceRange, minRating, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSubcategory("")
    setPriceRange([0, 5000])
    setMinRating(0)
    setSortBy("featured")
  }

  if (!category) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
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
        {/* Category Header */}
        <div className="mb-8">
          <div className="relative h-48 rounded-lg overflow-hidden mb-6">
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
                <p className="text-lg">{category.description}</p>
              </div>
            </div>
          </div>

          <ProductSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                categories={[category]}
                selectedCategory={category.name}
                onCategoryChange={() => {}}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChange={setSelectedSubcategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                minRating={minRating}
                onMinRatingChange={setMinRating}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <div className="mt-6">
                      <ProductFilters
                        categories={[category]}
                        selectedCategory={category.name}
                        onCategoryChange={() => {}}
                        selectedSubcategory={selectedSubcategory}
                        onSubcategoryChange={setSelectedSubcategory}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        minRating={minRating}
                        onMinRatingChange={setMinRating}
                        onClearFilters={clearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground">{filteredProducts.length} products found</span>
              </div>

              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <ProductGrid products={filteredProducts} viewMode={viewMode} />

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
