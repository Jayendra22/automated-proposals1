import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { Save, X, PlusCircle, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';

const AUTOMATA_CONCEPTS = [
    'Deterministic Finite Automata (DFA)',
    'Non-deterministic Finite Automata (NFA)',
    'Pushdown Automata (PDA)',
    'Turing Machines',
    'Context-Free Grammars (CFG)',
    'Regular Expressions'
];

const STATUS_OPTIONS = ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'];

const ProposalForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        objectives: '',
        automataConcepts: [],
        status: 'DRAFT'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            if (!isEdit) {
                setFormData(prev => ({ ...prev, author: parsedUser.username }));
            }
        } else {
            // Redirect to login if not authenticated
            navigate('/login');
        }

        if (isEdit) {
            loadProposal();
        }
    }, [id]);

    const loadProposal = async () => {
        try {
            setLoading(true);
            const response = await api.getById(id);
            setFormData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error loading proposal:', err);
            setError('Failed to load proposal data.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConceptToggle = (concept) => {
        setFormData(prev => {
            const current = prev.automataConcepts || [];
            if (current.includes(concept)) {
                return { ...prev, automataConcepts: current.filter(c => c !== concept) };
            } else {
                return { ...prev, automataConcepts: [...current, concept] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isEdit) {
                await api.update(id, formData);
            } else {
                await api.create(formData);
            }
            navigate('/');
        } catch (err) {
            console.error('Error saving proposal:', err);
            setError('Failed to save proposal. Please check if the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="py-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        {isEdit ? <Edit2 className="h-8 w-8" /> : <PlusCircle className="h-8 w-8" />}
                        {isEdit ? 'Edit Research Proposal' : 'Create New Research Proposal'}
                    </h1>
                    <p className="text-blue-100 mt-2 opacity-90">
                        {isEdit ? 'Update existing research proposal details.' : 'Fill out the form below to start your new proposal.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center gap-3">
                            <AlertCircle className="text-red-500 h-5 w-5" />
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Proposal Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter a descriptive title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Author Name</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                readOnly
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                            placeholder="Briefly describe the research proposal..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-black"
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Measurable Objectives</label>
                        <textarea
                            name="objectives"
                            value={formData.objectives}
                            onChange={handleChange}
                            rows="3"
                            required
                            placeholder="What are the key goals and objectives of this proposal?"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-black"
                        ></textarea>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Relevant Automata Concepts</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            {AUTOMATA_CONCEPTS.map((concept) => (
                                <label key={concept} className="flex items-center space-x-3 cursor-pointer group hover:bg-white p-2 rounded-lg transition-colors">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={(formData.automataConcepts || []).includes(concept)}
                                            onChange={() => handleConceptToggle(concept)}
                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                    </div>
                                    <span className={`text-sm ${(formData.automataConcepts || []).includes(concept) ? 'text-blue-700 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                        {concept}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Workflow Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black"
                            >
                                {STATUS_OPTIONS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Save className="h-5 w-5" />
                            )}
                            {isEdit ? 'Update Proposal' : 'Create Proposal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProposalForm;
