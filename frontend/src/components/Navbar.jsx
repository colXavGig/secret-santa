import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Gift, LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-christmas-red text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                    <Gift size={28} />
                    <span>Secret Santa</span>
                </Link>
                {user && (
                    <div className="flex items-center gap-4">
                        <span>Ho Ho Ho, {user.username}!</span>
                        <button onClick={logout} className="flex items-center gap-1 hover:text-christmas-gold transition-colors">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
