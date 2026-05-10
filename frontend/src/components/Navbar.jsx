import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Home, PlusSquare, Menu, X, Heart, Calendar } from 'lucide-react';


const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: '1rem',
      margin: '0 2rem',
      padding: '0.6rem 1.5rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        HostelHub
      </Link>

      {/* Desktop Menu */}
      <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/hostels" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Home size={16} /> Hostels
        </Link>
        
        {user?.role === 'host' ? (
          <Link to="/add-hostel" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <PlusSquare size={16} /> Add Hostel
          </Link>
        ) : user ? (
          <>
            <Link to="/favourites" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Heart size={16} /> Saved
            </Link>
            <Link to="/bookings" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} /> My Bookings
            </Link>
          </>
        ) : null}


        {user ? (
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} /> {user.fullName.split(' ')[0]}
            </span>
            <button onClick={handleLogout} style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>Login</Link>
            <Link to="/signup" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Sign Up</Link>
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ display: 'none', background: 'none', color: 'var(--text-main)' }}
        className="mobile-toggle"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};


export default Navbar;
