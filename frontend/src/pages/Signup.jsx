import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, UserCheck, Loader2 } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'guest'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      await axios.post(`${apiUrl}/signup`, formData);
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Signup failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '2rem 0' }}>
      <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h2>
        <p className="hero-text" style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>Join the community today</p>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.85rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="form-input"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              style={{ paddingLeft: '3rem' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="form-input"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ paddingLeft: '3rem' }}
            />
          </div>

          <div className="grid-cols-2" style={{ gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                placeholder="Password" 
                className="form-input"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={{ paddingLeft: '3rem' }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                placeholder="Confirm" 
                className="form-input"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', margin: '0.5rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', flex: 1 }}>
              <input 
                type="radio" 
                name="role" 
                value="guest" 
                checked={formData.role === 'guest'}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Guest</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', flex: 1 }}>
              <input 
                type="radio" 
                name="role" 
                value="host" 
                checked={formData.role === 'host'}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{ accentColor: 'var(--secondary)' }}
              />
              <span>Host</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </div>
  );

};

export default Signup;
