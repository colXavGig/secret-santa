import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { Send } from 'lucide-react';
import { API_URL } from '../config';

export default function Chat({ groupId, receiverId, title }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useAuth();
    const socket = useSocket();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        
        if (socket) {
            const handleMessage = (data) => {
                if (data.groupId === groupId) {
                    setMessages(prev => [...prev, data.message]);
                    if (data.message.sender !== user._id) {
                        toast(`New message: ${data.message.content.substring(0, 20)}...`, { icon: '💬' });
                    }
                }
            };
            socket.on('message_received', handleMessage);
            return () => socket.off('message_received', handleMessage);
        }
    }, [groupId, receiverId, socket]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/messages/${groupId}/${receiverId}`);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            const { data } = await axios.post(`${API_URL}/api/messages/${groupId}/${receiverId}`, { message: newMessage });
            setMessages([...messages, data]);
            setNewMessage('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-christmas-green flex flex-col h-96">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-lg mb-4">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm mt-4">No messages yet. Say hi!</p>
                ) : (
                    messages.map(msg => {
                        const isMe = msg.sender === user._id;
                        return (
                            <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${isMe ? 'bg-christmas-green text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                    <p className="font-semibold text-xs opacity-75 mb-1">{isMe ? 'You' : (msg.isAnonymous ? 'Secret Santa 🎅' : 'Giftee 🎁')}</p>
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
                <input type="text" placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} required 
                       className="flex-1 rounded-full border-gray-300 shadow-sm p-2 px-4 border text-sm focus:border-christmas-green focus:ring-christmas-green" />
                <button type="submit" className="bg-christmas-green text-white p-2 px-4 rounded-full hover:bg-christmas-darkgreen transition-colors flex items-center justify-center">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
