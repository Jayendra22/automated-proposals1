import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProposalForm from './components/ProposalForm';
import ProposalDetails from './components/ProposalDetails';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<ProposalForm />} />
            <Route path="/edit/:id" element={<ProposalForm />} />
            <Route path="/view/:id" element={<ProposalDetails />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; 2026 Automata Proposal Generation System. Built with React & Spring Boot.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
