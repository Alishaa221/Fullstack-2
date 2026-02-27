import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import LoadingSpinner from "./components/LoadingSpinner"

const Home = lazy(() => import("./pages/Home"))
const Products = lazy(() => import("./pages/Products"))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Suspense>
  )
}

export default App