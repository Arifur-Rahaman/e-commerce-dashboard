import ProductsList from "./pages/ProductsList";
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import ProductAdd from "./pages/ProductAdd";
import DashboardLayout from "./components/DashboardLayout";
function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductsList/>} />
        <Route path="addProduct" element={<ProductAdd />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;
