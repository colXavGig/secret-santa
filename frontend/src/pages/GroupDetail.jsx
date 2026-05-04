import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import Wishlist from '../components/Wishlist';
import Chat from '../components/Chat';
import { API_URL } from '../config';

export default function GroupDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [group, setGroup] = useState(null);
    const [giftee, setGiftee] = useState(null);

    useEffect(() => {
        fetchGroup();
    }, [id]);

    const fetchGroup = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/groups/${id}`);
            setGroup(data);
            if (data.status === 'matched') {
                const pair = data.pairs.find(p => p.santa?._id === user._id);
                if (pair) setGiftee(pair.giftee);
            }
        } catch (error) {
            toast.error('Failed to load group details');
        }
    };

    const handleDraw = async () => {
        try {
            await axios.post(`${API_URL}/api/groups/${id}/draw`);
            toast.success('Pairs matched successfully!');
            fetchGroup();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to draw pairs');
        }
    };

    if (!group) return <div>Loading...</div>;

    const isAdmin = group.admin._id === user._id;

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-christmas-green">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{group.name}</h1>
                        <p className="text-gray-500">Group ID: {group._id}</p>
                    </div>
                    {isAdmin && group.status === 'open' && (
                        <button onClick={handleDraw} className="bg-christmas-red text-white px-6 py-3 rounded-md font-bold hover:bg-christmas-darkred shadow-md transition-colors">
                            Draw Pairs
                        </button>
                    )}
                </div>
            </div>

            {group.status === 'matched' ? (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-christmas-gold">
                            <h2 className="text-2xl font-bold mb-4">Your Giftee 🎁</h2>
                            {giftee ? (
                                <p className="text-lg">You are the Secret Santa for: <span className="font-bold text-christmas-red">{giftee.username}</span></p>
                            ) : (
                                <p>You were not assigned a giftee.</p>
                            )}
                        </div>
                        {giftee && (
                            <Wishlist groupId={group._id} userId={giftee._id} isOwn={false} />
                        )}
                        {giftee && (
                            <Chat groupId={group._id} receiverId={giftee._id} title={`Message ${giftee.username}`} />
                        )}
                    </div>
                    <div className="space-y-8">
                        <Wishlist groupId={group._id} userId={user._id} isOwn={true} />
                        <Chat groupId={group._id} receiverId={user._id} title="Messages from your Secret Santa" />
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <h2 className="text-xl font-medium text-gray-600 mb-4">Waiting for the admin to draw pairs...</h2>
                    <p>Current Members: {group.members.length}</p>
                    <ul className="mt-4 inline-block text-left">
                        {group.members.map(m => (
                            <li key={m._id} className="list-disc ml-4">{m.username}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
