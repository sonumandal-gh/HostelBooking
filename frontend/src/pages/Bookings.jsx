import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { IndianRupee, MapPin, Loader2, Trash2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const res = await axios.get(`${apiUrl}/guest/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      await axios.post(`${apiUrl}/guest/bookings/cancel`, { bookingId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.filter(b => b._id !== bookingId));
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="animate-spin" size={48} color="var(--primary)" /></div>;

  return (
    <div className="container animate-fade-in">
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <Home size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>No bookings found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Explore hostels and start booking today!</p>
          <Link to="/hostels" className="btn-primary" style={{ display: 'inline-flex' }}>Explore Hostels</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map(booking => (
            <div key={booking._id} className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <img 
                src={booking.homeId?.image ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'}/uploads/${booking.homeId.image}` : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400'} 
                alt={booking.homeId?.homeName}
                style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{booking.homeId?.homeName}</h3>
                <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <MapPin size={14} /> {booking.homeId?.city}
                </p>
                <p style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                  Status: <span style={{ textTransform: 'capitalize' }}>{booking.status}</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}><IndianRupee size={16} /> {booking.homeId?.price}</p>
                <button 
                  onClick={() => cancelBooking(booking._id)}
                  style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  <Trash2 size={14} /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
