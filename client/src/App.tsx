import "./App.css";
import Dashboard from "./ui/views/Dashboard";
import LoginComponent from "./ui/views/auth/Login";
import {Products} from "./ui/views/product/Products.tsx";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./ui/components/Layout.tsx";
import {NewProduct} from "./ui/views/product/NewProduct.tsx";
import {ManageProduct} from "./ui/views/product/ManageProduct.tsx";
import {Users} from "./ui/views/user/Users.tsx";
import {NewUser} from "./ui/views/user/NewUser.tsx";
import {ManageUser} from "./ui/views/user/ManageUser.tsx";


function App() {
  return (
    <div className="App">
      <Routes>
        {/*<Route path="/register" element={<div>Register</div>}/>*/}
        <Route path="/login" element={<LoginComponent/>}/>
        <Route path="/" element={<Layout/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>

          {/* Product Management */}
          <>
            <Route path="/products" element={<Products/>}/>
            <Route path="products/new" element={<NewProduct/>}/>
            <Route path="products/:id/manage" element={<ManageProduct/>}/>
          </>

          {/* Inventory Management */}
          <Route path="/stock" element={<div>Stock</div>}/>
          <Route path="/sales" element={<div>Sales</div>}/>

          {/* User Management */}
          <>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/new" element={<NewUser/>}/>
            <Route path="/users/:id/manage" element={<ManageUser/>}/>
          </>

          <Route path="/settings" element={<div>Settings</div>}/>
          <Route path="/logout" element={<div>Logout</div>}/>
        </Route>

        <Route path="*" element={<div>404</div>}/>
      </Routes>
    </div>
  );
}

export default App;
