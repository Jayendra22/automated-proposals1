import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Edit2, Trash2, Eye, Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ProposalList = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        loadProposals();
    }, []);

    const canModify = (proposal) => {
        if (!user) return false;
        if (user.role === 'ADMIN') return true;
        return user.username === proposal.author;
    };

    const loadProposals = async () => {
        try {
            setLoading(true);
            const response = await api.getAll();
            setProposals(response.data);
            setError(null);
        } catch (err) {
            console.error('Error loading proposals:', err);
            setError('Failed to load proposals. Please check if the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this proposal?')) {
            try {
                await api.delete(id);
                loadProposals();
            } catch (err) {
                console.error('Error deleting proposal:', err);
                alert('Failed to delete proposal.');
            }
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.updateStatus(id, newStatus);
            loadProposals();
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update proposal status.');
        }
    };

    const filteredProposals = proposals.filter(p => 
        (p.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (p.author?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'DRAFT': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'SUBMITTED': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
            case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Research Proposals</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search proposals..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-80 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded flex items-center gap-3">
                    <AlertCircle className="text-red-400 h-5 w-5" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {!loading && filteredProposals.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-lg">No proposals found.</p>
                    <Link to="/create" className="text-blue-600 hover:underline mt-2 inline-block">Create your first proposal</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProposals.map((proposal) => (
                        <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                                        {proposal.status}
                                    </span>
                                    <div className="flex space-x-2">
                                        <Link to={`/view/${proposal.id}`} title="View Details" className="text-gray-400 hover:text-blue-600 transition">
                                            <Eye className="h-5 w-5" />
                                        </Link>
                                        {canModify(proposal) && (
                                            <>
                                                {user.role === 'ADMIN' && (
                                                    <div className="flex space-x-2 mr-2 border-r border-gray-200 pr-2">
                                                        <button 
                                                            onClick={() => handleStatusUpdate(proposal.id, 'APPROVED')}
                                                            title="Approve Proposal"
                                                            className="text-gray-400 hover:text-green-600 transition"
                                                        >
                                                            <CheckCircle className="h-5 w-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusUpdate(proposal.id, 'REJECTED')}
                                                            title="Reject Proposal"
                                                            className="text-gray-400 hover:text-red-600 transition"
                                                        >
                                                            <XCircle className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                )}
                                                <Link to={`/edit/${proposal.id}`} title="Edit Proposal" className="text-gray-400 hover:text-green-600 transition">
                                                    <Edit2 className="h-5 w-5" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(proposal.id)} 
                                                    title="Delete Proposal"
                                                    className="text-gray-400 hover:text-red-600 transition"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{proposal.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 flex items-center">
                                    <span className="font-medium">Author:</span> <span className="ml-1">{proposal.author}</span>
                                </p>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 h-15">
                                    {proposal.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {proposal.automataConcepts?.slice(0, 3).map((concept, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded uppercase tracking-wider">
                                            {concept}
                                        </span>
                                    ))}
                                    {proposal.automataConcepts?.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded">
                                            +{proposal.automataConcepts.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProposalList;
