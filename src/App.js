import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import ActivateAccount from './components/activate-account/ActivateAccount';
import ContactUs from './components/contact-us/ContactUs';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import Header from './components/header/Header';
import Home from './components/home/home';
import Login from './components/login/Login';
import ProductsContainer from './components/product-container/ProductsContainer';
import ResetPassword from './components/reset-password/ResetPassword';
import SignUp from './components/sign-up/SignUp';
import UserProvider from './context/user-context/UserProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductProvider from './context/product-context/ProductProvider';
import Cart from './components/cart/Cart';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Orders from './components/orders/orders';
import OrderProvider from './context/orders-context/OrderProvider';
import PageNotFound from './components/page-not-found/PageNotFound';

function App() {

  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      <BrowserRouter>
        <ProductProvider>
          <UserProvider>
            <OrderProvider>
              <Header></Header>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/products" component={ProductsContainer} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/activate-account/:activationCode" component={ActivateAccount} />
                <ProtectedRoute path="/cart" component={Cart} />
                <ProtectedRoute path="/orders" exact component={Orders} />
                <Route path='/404' component={PageNotFound} />
                <Route exact path="/" >
                  <Redirect to="/home" />
                </Route>
                <Route path="*">
                  <Redirect to="/404" />
                </Route>
              </Switch>
            </OrderProvider>
          </UserProvider>
        </ProductProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
