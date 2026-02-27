const products = Array.from({ length: 1500 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000),
  category: i % 2 === 0 ? "Electronics" : "Clothing",
  image: "https://via.placeholder.com/150"
}))

export default products