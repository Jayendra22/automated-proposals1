import React, { useState, useEffect } from 'react';
import ProposalList from './ProposalList';
import { LayoutDashboard, Users, FileText, CheckCircle, MessageSquare, Star } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        approved: 0,
        pending: 0,
        users: 0
    });

    const [feedbacks] = useState([
        {
            id: 1,
            name: "Dr. Alan Turing",
            role: "Research Head",
            comment: "This system has revolutionized how we manage automata theory research proposals. Highly efficient!",
            rating: 5
        },
        {
            id: 2,
            name: "Prof. Grace Hopper",
            role: "Senior Academic",
            comment: "The interface is intuitive and the proposal tracking feature is exactly what we needed.",
            rating: 5
        },
        {
            id: 3,
            name: "Dr. Claude Shannon",
            role: "Information Scientist",
            comment: "Excellent platform for collaboration and feedback on complex theoretical work.",
            rating: 4
        }
    ]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await api.getAll();
            const proposals = response.data;
            setStats({
                total: proposals.length,
                approved: proposals.filter(p => p.status === 'APPROVED').length,
                pending: proposals.filter(p => p.status === 'SUBMITTED' || p.status === 'DRAFT').length,
                users: new Set(proposals.map(p => p.author)).size
            });
        } catch (err) {
            console.error('Error loading dashboard stats:', err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="mt-2 text-lg text-gray-600">Welcome to the Automata Proposal Management System.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 font-medium">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Real-time Analytics</span>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition cursor-default">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Proposals</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition cursor-default">
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Approved</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition cursor-default">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Review</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition cursor-default">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Authors</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
                    </div>
                </div>
            </div>

            {/* Main Content - Proposal List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <ProposalList />
                </div>
            </div>

            {/* Customer Feedback Section */}
            <section className="py-12 bg-gray-900 rounded-3xl px-8 md:px-12 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                        <h2 className="text-3xl font-bold">User Feedback</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {feedbacks.map((item) => (
                            <div key={item.id} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/15 transition group">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-6 leading-relaxed group-hover:text-white transition">
                                    "{item.comment}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{item.name}</h4>
                                        <p className="text-sm text-gray-400">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

