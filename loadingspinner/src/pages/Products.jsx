import { useState, useMemo, useCallback } from "react"
import productsData from "../data/products"
import ProductList from "../components/ProductList"
import SearchBar from "../components/SearchBar"

function Products() {
  const [query, setQuery] = useState("")

  const handleSearch = useCallback((value) => {
    setQuery(value)
  }, [])

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div>
      <h2>Product List</h2>
      <SearchBar onSearch={handleSearch} />
      <ProductList products={filteredProducts} />
    </div>
  )
}

export default Products