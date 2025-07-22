import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Ofertas from './components/Ofertas';
import Infaltables from './components/Infaltables';
import Login from './components/Login'; 
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import Carrito from './components/Carrito'; 
import CrudProductos from './components/CrudProductos';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/administracion" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/infaltables" element={<Infaltables />} />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Carrito />
              </PrivateRoute>
            }
          />
          <Route
            path="/crud"
            element={
              <PrivateRoute>
                <CrudProductos />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
