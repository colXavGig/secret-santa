import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSocket } from '../contexts/SocketContext';
import { Plus } from 'lucide-react';

export default function Wishlist({ groupId, userId, isOwn }) {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', link: '' });
    const socket = useSocket();

    useEffect(() => {
        fetchWishlist();
        
        if (!isOwn && socket) {
            const handleWishlistAdd = (data) => {
                if (data.groupId === groupId && data.gifteeId === userId) {
                    setItems(prev => [...prev, data.item]);
                    toast(`🎁 Your giftee added a new item: ${data.item.name}`, { icon: '✨' });
                }
            };
            socket.on('wishlist_added', handleWishlistAdd);
            return () => socket.off('wishlist_added', handleWishlistAdd);
        }
    }, [groupId, userId, socket, isOwn]);

    const fetchWishlist = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/wishlists/${groupId}/${userId}`);
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/wishlists/${groupId}`, newItem);
            setItems([...items, data]);
            setNewItem({ name: '', description: '', link: '' });
            toast.success('Item added!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add item');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-christmas-red">
            <h3 className="text-xl font-bold mb-4">{isOwn ? 'My Wishlist' : 'Their Wishlist'}</h3>
            
            {items.length === 0 ? (
                <p className="text-gray-500 italic mb-4">No items yet.</p>
            ) : (
                <ul className="space-y-3 mb-6">
                    {items.map(item => (
                        <li key={item._id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-800">{item.name}</h4>
                            {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline break-all">{item.link}</a>}
                        </li>
                    ))}
                </ul>
            )}

            {isOwn && (
                <form onSubmit={handleAdd} className="space-y-3 border-t pt-4">
                    <input type="text" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm" />
                    <input type="text" placeholder="Description (Optional)" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm" />
                    <input type="url" placeholder="Link (Optional)" value={newItem.link} onChange={e => setNewItem({...newItem, link: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm" />
                    <button type="submit" className="w-full flex justify-center items-center gap-2 bg-christmas-red text-white py-2 rounded-md hover:bg-christmas-darkred transition-colors text-sm font-medium">
                        <Plus size={16} /> Add Item
                    </button>
                </form>
            )}
        </div>
    );
}
