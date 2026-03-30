import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, PlusCircle, Home, LogIn, UserPlus, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [window.location.pathname]); // Simple way to refresh when route changes

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg w-full">
            <div className="px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <FileText className="h-8 w-8" />
                            <span className="font-bold text-xl tracking-tight">Automata Proposal System</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded-md transition duration-150">
                            <Home className="h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                        
                        {user && (
                            <Link to="/create" className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md transition duration-150">
                                <PlusCircle className="h-4 w-4" />
                                <span>New Proposal</span>
                            </Link>
                        )}

                        <div className="h-8 w-px bg-blue-500 mx-2"></div>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 bg-blue-700 px-3 py-1.5 rounded-full border border-blue-400">
                                    {user.role === 'ADMIN' ? (
                                        <ShieldCheck className="h-4 w-4 text-yellow-300" />
                                    ) : (
                                        <UserIcon className="h-4 w-4 text-blue-200" />
                                    )}
                                    <span className="text-sm font-bold">{user.username}</span>
                                    <span className="text-[10px] bg-blue-800 px-1.5 py-0.5 rounded uppercase tracking-tighter opacity-80">
                                        {user.role}
                                    </span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 hover:bg-red-600 px-3 py-2 rounded-md transition duration-150 bg-red-500 text-white font-bold text-sm shadow-sm"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded-md transition duration-150 border border-blue-400">
                                    <LogIn className="h-4 w-4" />
                                    <span>Login</span>
                                </Link>
                                <Link to="/register" className="flex items-center space-x-1 bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-150 font-bold shadow-md">
                                    <UserPlus className="h-4 w-4" />
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
