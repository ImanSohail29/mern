import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RouteWithUserChatComponent from "./components/user/RouteWithUserChatComponent";
import ScrollToTop from "./utils/ScrollToTop";
function App() {
  return (

    <BrowserRouter>
    <ScrollToTop></ScrollToTop>
    <Header/>
    <Routes>

    {/* <Route element={<RouteWithUserChatComponent/>}> */}
    <Route element={<RouteWithUserChatComponent/>}>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/cart" element={<CartPage/>}></Route>
          <Route path="/product-detail" element={<ProductDetailsPage/>}></Route>
          <Route path="/product-detail/:id" element={<ProductDetailsPage/>}></Route>
          <Route path="/product-list/:pageNum" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/:pageNum" element={<ProductListPage />} />
          <Route path="/product-list/search/:searchQuery" element={<ProductListPage />} />
          <Route path="/product-list/search/:searchQuery/:pageNum" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/search/:searchQuery" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/search/:searchQuery/:pageNum" element={<ProductListPage />} />          <Route path="/product-list" element={<ProductListPage/>}></Route>
     </Route>
      <Route element={<ProtectedRoutesComponent admin={false}/>}>
          <Route path="/user" element={<UserProfilePage/>}></Route>
          <Route path="/user/my-orders" element={<UserOrdersPage/>}></Route>
          <Route path="/user/cart-details" element={<UserCartDetailsPage/>}></Route>
          <Route path="/user/order-details/:id" element={<UserOrderDetailsPage/>}></Route>
      </Route>
    {/* </Route> */
    /*This ProtectedRoutesComponent is responsible for protecting restricted URLS, not only API but also the front-end
     */}
      <Route element={<ProtectedRoutesComponent admin={true}/>}> 
        <Route path="/admin/users" element={<AdminUsersPage/>}></Route>
        <Route path="/admin/edit-user/:id" element={<AdminEditUserPage/>}></Route>
        <Route path="/admin/create-new-product" element={<AdminCreateProductPage/>}></Route>
        <Route path="/admin/products" element={<AdminProductsPage/>}></Route>
        <Route path="/admin/edit-product/:id" element={<AdminEditProductPage/>}></Route>
        <Route path="/admin/orders" element={<AdminOrdersPage/>}></Route>
        <Route path="/admin/order-details/:id" element={<AdminOrderDetailsPage/>}></Route>
        <Route path="/admin/analytics" element={<AdminAnalyticsPage/>}></Route>
        <Route path="/admin/chats" element={<AdminChatsPage/>}></Route>

      </Route>
      <Route path="*" element="Page does not exist"></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
