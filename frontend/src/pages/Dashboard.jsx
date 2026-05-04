import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PlusCircle, Users } from 'lucide-react';

export default function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [joinGroupId, setJoinGroupId] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/groups`);
            setGroups(data);
        } catch (error) {
            toast.error('Failed to load groups');
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/groups`, { name: newGroupName });
            setNewGroupName('');
            fetchGroups();
            toast.success('Group created!');
        } catch (error) {
            toast.error('Failed to create group');
        }
    };

    const handleJoinGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/groups/${joinGroupId}/join`);
            setJoinGroupId('');
            fetchGroups();
            toast.success('Joined group!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to join group');
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-christmas-darkgreen text-center">Your Secret Santa Groups</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-christmas-red">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <PlusCircle className="text-christmas-red" /> Create Group
                    </h2>
                    <form onSubmit={handleCreateGroup} className="space-y-4">
                        <input type="text" placeholder="Group Name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} required
                               className="w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-red focus:ring-christmas-red p-2 border" />
                        <button type="submit" className="w-full bg-christmas-red text-white py-2 rounded-md hover:bg-christmas-darkred transition-colors">Create</button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-christmas-green">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Users className="text-christmas-green" /> Join Group
                    </h2>
                    <form onSubmit={handleJoinGroup} className="space-y-4">
                        <input type="text" placeholder="Group ID" value={joinGroupId} onChange={(e) => setJoinGroupId(e.target.value)} required
                               className="w-full rounded-md border-gray-300 shadow-sm focus:border-christmas-green focus:ring-christmas-green p-2 border" />
                        <button type="submit" className="w-full bg-christmas-green text-white py-2 rounded-md hover:bg-christmas-darkgreen transition-colors">Join</button>
                    </form>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {groups.map(group => (
                    <Link to={`/group/${group._id}`} key={group._id} className="block group">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-christmas-gold h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-christmas-red transition-colors">{group.name}</h3>
                                <p className="text-sm text-gray-500 mt-2">ID: {group._id}</p>
                                <p className="text-sm text-gray-500">Status: <span className={`font-semibold ${group.status === 'matched' ? 'text-christmas-green' : 'text-christmas-gold'}`}>{group.status}</span></p>
                            </div>
                            <div className="mt-4 text-christmas-red font-medium flex items-center justify-between">
                                <span>{group.members.length} Members</span>
                                <span>View Details &rarr;</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
