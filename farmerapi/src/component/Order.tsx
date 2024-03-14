
import { Link } from 'react-router-dom'

export default function Order() {
  return (
    <div>
      <h1>Order Page</h1>
      <Link to='/product'>
      <button>Confirm Order</button>
      </Link>
    </div>
  )
}
