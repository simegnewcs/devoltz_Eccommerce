"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"
import type { Category } from "@/lib/types"

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedSubcategory: string
  onSubcategoryChange: (subcategory: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
  onClearFilters: () => void
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  onClearFilters,
}: ProductFiltersProps) {
  const selectedCategoryData = categories.find((cat) => cat.name === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategory === category.name}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onCategoryChange(category.name)
                      onSubcategoryChange("")
                    } else {
                      onCategoryChange("")
                      onSubcategoryChange("")
                    }
                  }}
                />
                <Label htmlFor={category.id} className="text-sm font-medium">
                  {category.name}
                </Label>
              </div>

              {/* Subcategories */}
              {selectedCategory === category.name && category.subcategories.length > 0 && (
                <div className="ml-6 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={subcategory.id}
                        checked={selectedSubcategory === subcategory.name}
                        onCheckedChange={(checked) => {
                          onSubcategoryChange(checked ? subcategory.name : "")
                        }}
                      />
                      <Label htmlFor={subcategory.id} className="text-sm">
                        {subcategory.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            max={5000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => {
                  onMinRatingChange(checked ? rating : 0)
                }}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm">& up</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
