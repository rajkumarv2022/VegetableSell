
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './component/LoginPage'
import LandinPage from './component/LandinPage'
import SignupPage from './component/SignupPage'
import ProductList from './component/ProductList'
import ProductCreatePage from './component/ProductCreatePage'
import Order from './component/Order'
import OrderHistory from './component/OrderHistory'
import ProductsList from './component/ProductsList'
import ProductsDetail from './component/ProductsDetail'

import OrderHistoryMangement from './component/OrderHistoryMangement'
import AddtoCart from './component/AddtoCart'
import AddProducttoCart from './component/AddProducttoCart'
import EditorDeleteProducts from './component/EditorDeleteProducts'

export default function App() {

  
  return (
    
      <Router>

      

      <Routes>

      
        <Route path='/' Component={LandinPage}></Route>
        <Route path='/Login' Component={LoginPage}></Route>
        <Route path='/Signup' Component={SignupPage}></Route>
        <Route path='/product/:user_id' Component={ProductList}></Route>
        <Route path='/products/:user_id' Component={ProductsList}></Route>
        <Route path='/product/order' Component={Order}></Route>
        <Route path='/product/:user_id/history' Component={OrderHistory}></Route>
        <Route path='/products/:user_id/new' Component={ProductCreatePage}></Route>
        <Route path='/products/details' Component={ProductsDetail}></Route>
        <Route path='/product/:user_id/history/:order_id' Component={OrderHistoryMangement}></Route>
        <Route path='/product/:userId/viewcart' Component={AddtoCart}></Route>
        <Route path='/product/:userId/:productId/addtocart' Component={AddProducttoCart}></Route>
        <Route path='/products/:sellerId/:product_id' Component={EditorDeleteProducts}></Route>
        
      </Routes>

      </Router>

  )
}
