import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, username, password, confirmPassword);
            toast.success('Registered successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            if (error.response?.data?.errors) {
                error.response.data.errors.forEach(err => toast.error(err.message));
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-christmas-green">
            <h2 className="text-3xl font-bold text-center text-christmas-red mb-6">Join the Fun!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-green focus:ring-christmas-green p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-green focus:ring-christmas-green p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-green focus:ring-christmas-green p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-green focus:ring-christmas-green p-2 border" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-christmas-red hover:bg-christmas-darkred focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-christmas-red transition-colors">
                    Register
                </button>
            </form>
            <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link to="/login" className="text-sm text-christmas-green hover:underline">Log in</Link>
            </div>
        </div>
    );
}
