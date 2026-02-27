import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <h1>Performance Optimization Experiment</h1>
      <Link to="/products">Go to Products</Link>
    </div>
  )
}

export default Home