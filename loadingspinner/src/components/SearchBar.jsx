import { useState, useEffect } from "react"

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input)
    }, 500)

    return () => clearTimeout(timer)
  }, [input, onSearch])

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  )
}

export default SearchBar