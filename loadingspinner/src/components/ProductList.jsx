import { FixedSizeList } from "react-window"
import ProductCard from "./ProductCard"

function ProductList({ products }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ProductCard product={products[index]} />
    </div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={products.length}
      itemSize={120}
      width={"100%"}
    >
      {Row}
    </FixedSizeList>
  )
}

export default ProductList