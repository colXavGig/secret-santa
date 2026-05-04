import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GroupDetail from './pages/GroupDetail';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
    return (
        <div className="min-h-screen bg-christmas-snow font-sans">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/group/:id" element={<PrivateRoute><GroupDetail /></PrivateRoute>} />
                </Routes>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </SocketProvider>
        </AuthProvider>
    );
}

export default App;
