import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { IndianRupee, MapPin, Loader2, Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const { token } = useAuth();
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const res = await axios.get(`${apiUrl}/guest/favourites`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, [token]);

  const removeFav = async (hostelId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      await axios.post(`${apiUrl}/guest/favourites/remove`, { hostelId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavs(favs.filter(f => f._id !== hostelId));
    } catch (err) {
      alert('Failed to remove from favourites');
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="animate-spin" size={48} color="var(--primary)" /></div>;

  return (
    <div className="container animate-fade-in">
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Saved Hostels</h2>

      {favs.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <Heart size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>Your wishlist is empty</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Save the best hostels to view them later.</p>
          <Link to="/hostels" className="btn-primary" style={{ display: 'inline-flex' }}>Explore Hostels</Link>
        </div>
      ) : (
        <div className="grid-cols-3" style={{ gap: '2rem' }}>
          {favs.map(hostel => (
            <div key={hostel._id} className="glass" style={{ overflow: 'hidden' }}>
              <div style={{ height: '200px', position: 'relative' }}>
                <img 
                  src={hostel.image ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'}/uploads/${hostel.image}` : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600'} 
                  alt={hostel.homeName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button 
                  onClick={() => removeFav(hostel._id)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(239, 68, 68, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.5rem', borderRadius: '50%', color: '#ef4444' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div style={{ padding: '1.2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>{hostel.homeName}</h3>
                <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <MapPin size={14} /> {hostel.city}
                </p>
                <Link to={`/hostels/${hostel._id}`} className="btn-primary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem' }}>
                  View Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
