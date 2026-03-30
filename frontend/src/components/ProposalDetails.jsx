import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { ArrowLeft, Edit, Clock, User, BookOpen, Target, CheckCircle2, AlertCircle, FileText, CheckCircle, XCircle } from 'lucide-react';

const ProposalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        loadProposal();
    }, [id]);

    const canEdit = () => {
        if (!user || !proposal) return false;
        if (user.role === 'ADMIN') return true;
        return user.username === proposal.author;
    };

    const loadProposal = async () => {
        try {
            setLoading(true);
            const response = await api.getById(id);
            setProposal(response.data);
            setError(null);
        } catch (err) {
            console.error('Error loading proposal:', err);
            setError('Failed to load proposal details.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            await api.updateStatus(id, newStatus);
            loadProposal();
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update proposal status.');
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'DRAFT': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'SUBMITTED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'APPROVED': return 'bg-green-100 text-green-700 border-green-200';
            case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-2xl mx-auto p-8 bg-red-50 border border-red-200 rounded-xl text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800">{error}</h2>
            <button onClick={() => navigate('/')} className="mt-4 text-red-600 hover:underline">Back to Dashboard</button>
        </div>
    );

    if (!proposal) return null;

    return (
        <div className="py-8">
            <div className="mb-8 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    Back to Dashboard
                </Link>
                {canEdit() && (
                    <Link to={`/edit/${id}`} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg font-bold">
                        <Edit className="h-4 w-4" />
                        Edit Proposal
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1 rounded-full text-xs font-bold border tracking-wider uppercase ${getStatusStyles(proposal.status)}`}>
                                    {proposal.status}
                                </span>
                                {user?.role === 'ADMIN' && (
                                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                                        <button 
                                            onClick={() => handleStatusUpdate('APPROVED')}
                                            className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded-md text-xs font-bold transition-colors"
                                        >
                                            <CheckCircle className="h-3 w-3" /> Approve
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate('REJECTED')}
                                            className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-md text-xs font-bold transition-colors"
                                        >
                                            <XCircle className="h-3 w-3" /> Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">{proposal.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-500" />
                                    <span>{proposal.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-indigo-500" />
                                    <span>Created Mar 30, 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 border-b border-gray-100 pb-3">
                                    <BookOpen className="h-6 w-6 text-blue-600" />
                                    Research Description
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                    {proposal.description}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 border-b border-gray-100 pb-3">
                                    <Target className="h-6 w-6 text-red-600" />
                                    Key Objectives
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                    {proposal.objectives}
                                </p>
                            </section>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wider text-xs">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    Automata Concepts
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {proposal.automataConcepts?.length > 0 ? (
                                        proposal.automataConcepts.map((concept, idx) => (
                                            <div key={idx} className="bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm flex items-center gap-3 group hover:border-blue-400 transition-colors">
                                                <div className="h-2 w-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                                {concept}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic text-sm">No concepts listed.</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <FileText className="h-32 w-32" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 relative z-10 uppercase tracking-widest text-xs opacity-80">Quick Stats</h3>
                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <div className="text-3xl font-black">{proposal.automataConcepts?.length || 0}</div>
                                        <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Concepts Covered</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black">{proposal.description?.split(' ').length || 0}</div>
                                        <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Word Count</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalDetails;
