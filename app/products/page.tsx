"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter, Grid, List } from "lucide-react"
import { products, categories } from "@/lib/mock-data"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter and search products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search query filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }

      // Subcategory filter
      if (selectedSubcategory && product.subcategory !== selectedSubcategory) {
        return false
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Rating filter
      if (product.rating < minRating) {
        return false
      }

      return true
    })

    // Sort products
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
      default: // featured
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
  }, [searchQuery, selectedCategory, selectedSubcategory, priceRange, minRating, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedSubcategory("")
    setPriceRange([0, 5000])
    setMinRating(0)
    setSortBy("featured")
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
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
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
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
                {/* Mobile Filter Button */}
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
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
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

              {/* View Mode Toggle */}
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

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} viewMode={viewMode} />

            {/* No Results */}
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
