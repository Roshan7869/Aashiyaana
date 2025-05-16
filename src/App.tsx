import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;