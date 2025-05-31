import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import AddPropertyPage from './pages/AddPropertyPage'; // Added import

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
              <Route path="/add-property" element={<AddPropertyPage />} /> {/* Added route */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;