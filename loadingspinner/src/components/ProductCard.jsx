import React from "react"

const ProductCard = React.memo(({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
    </div>
  )
})

export default ProductCard