import "./App.css";
import Dashboard from "./ui/components/Dashboard";
import LoginComponent from "./ui/components/user/Login";
import {Products} from "./ui/components/product/Products.tsx";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./ui/components/Layout.tsx";
import {NewProduct} from "./ui/components/product/NewProduct.tsx";
import {ManageProduct} from "./ui/components/product/ManageProduct.tsx";


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
            <Route path="/users" element={<div>Users</div>}/>
            <Route path="/users/new" element={<div>New User</div>}/>
            <Route path="/users/:id/manage" element={<div>Manage User</div>}/>
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
