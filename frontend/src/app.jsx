// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import Layout from './components/common/Layout';
import HRDashboard from './components/hr/HRDashboard';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/hr" replace />} />
            <Route path="/hr/*" element={<HRDashboard />} />
            {/* Add other module routes here */}
            <Route path="/sales" element={<div>Sales Module</div>} />
            <Route path="/marketing" element={<div>Marketing Module</div>} />
            <Route path="/inventory" element={<div>Inventory Module</div>} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;