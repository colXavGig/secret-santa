import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-christmas-red">
            <h2 className="text-3xl font-bold text-center text-christmas-darkgreen mb-6">Welcome Back!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-red focus:ring-christmas-red p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-red focus:ring-christmas-red p-2 border" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-christmas-green hover:bg-christmas-darkgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-christmas-green transition-colors">
                    Log In
                </button>
            </form>
            <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link to="/register" className="text-sm text-christmas-red hover:underline">Register here</Link>
            </div>
        </div>
    );
}
