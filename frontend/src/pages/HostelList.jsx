import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { MapPin, IndianRupee, Star, Loader2, Search, Edit, Trash2 } from 'lucide-react';

const HostelList = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const fetchHostels = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const res = await axios.get(`${apiUrl}/hostels`);
      setHostels(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this hostel?')) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      await axios.delete(`${apiUrl}/host/delete-hostel/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchHostels();
    } catch (err) {
      console.error(err);
      alert('Failed to delete hostel');
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-hostel/${id}`);
  };

  const filteredHostels = hostels.filter(h => 
    h.homeName.toLowerCase().includes(search.toLowerCase()) || 
    h.city.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="animate-spin" size={48} color="var(--primary)" /></div>;

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Explore Hostels</h2>
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search city or hostel..." 
            className="form-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '3rem' }}
          />
        </div>
      </div>

      <div className="grid-cols-3" style={{ gap: '2rem' }}>
        {filteredHostels.map(hostel => (
          <Link to={`/hostels/${hostel._id}`} key={hostel._id} className="glass" style={{ overflow: 'hidden', transition: 'var(--transition)', display: 'block' }}>
            <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={hostel.image ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'}/uploads/${hostel.image}` : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'} 
                alt={hostel.homeName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: '0.3rem 0.6rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
                <Star size={12} fill="#fbbf24" color="#fbbf24" /> 4.8
              </div>

              {user?.role === 'host' && (
                <div style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={(e) => handleEdit(e, hostel._id)}
                    style={{ background: 'rgba(99, 102, 241, 0.9)', color: 'white', padding: '0.4rem', borderRadius: '8px', border: 'none' }}
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, hostel._id)}
                    style={{ background: 'rgba(239, 68, 68, 0.9)', color: 'white', padding: '0.4rem', borderRadius: '8px', border: 'none' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div style={{ padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{hostel.homeName}</h3>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                  <IndianRupee size={14} /> {hostel.price}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <MapPin size={14} /> {hostel.city}
              </p>
              <button className="btn-primary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--primary)' }}>
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );


};

export default HostelList;
