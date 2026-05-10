import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, IndianRupee, Star, Heart, Calendar, Loader2, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

const HostelDetails = () => {
  const { id } = useParams();
  const { user, token, updateUser } = useAuth();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const res = await axios.get(`${apiUrl}/hostels/${id}`);
        setHostel(res.data);
        
        // Check if favourite
        if (user && user.favourites?.includes(id)) {
          setIsFavourite(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, user]);

  const toggleFavourite = async () => {
    if (!user) return navigate('/login');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const endpoint = isFavourite ? 'remove' : 'add';
      const res = await axios.post(`${apiUrl}/guest/favourites/${endpoint}`, { hostelId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsFavourite(!isFavourite);
      updateUser({ favourites: res.data.favourites });
    } catch (err) {
      console.error(err);
    }
  };


  const handleBook = async () => {
    if (!user) return navigate('/login');
    setBookingLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      await axios.post(`${apiUrl}/guest/book`, { hostelId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Booking Successful! The host will contact you soon.');
    } catch (err) {
      setMessage('Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="animate-spin" size={48} color="var(--primary)" /></div>;
  if (!hostel) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}><h2>Hostel not found</h2></div>;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', background: 'none', marginBottom: '2rem', fontWeight: 600 }}>
        <ArrowLeft size={18} /> Back to explore
      </button>

      <div className="grid-cols-2" style={{ gap: '3rem', alignItems: 'start' }}>
        {/* Left: Image */}
        <div className="glass" style={{ overflow: 'hidden', height: '450px', position: 'relative' }}>
          <img 
            src={hostel.image ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'}/uploads/${hostel.image}` : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200'} 
            alt={hostel.homeName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {user?.role !== 'host' && (
            <button 
              onClick={toggleFavourite}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}
            >
              <Heart size={22} fill={isFavourite ? "#ec4899" : "none"} color={isFavourite ? "#ec4899" : "white"} />
            </button>
          )}
        </div>


        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={16} /> Verified Property
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{hostel.homeName}</h1>
            <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <MapPin size={20} /> {hostel.address}, {hostel.city}
            </p>
          </div>

          <div className="glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Price starts from</p>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
                <IndianRupee size={24} /> {hostel.price} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '0.3rem' }}>/ month</span>
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, fontSize: '1.2rem', justifyContent: 'flex-end' }}>
                <Star size={18} fill="#fbbf24" color="#fbbf24" /> 4.8
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>120+ reviews</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Amenities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {['Free WiFi', '24/7 Security', 'Laundry', 'AC Rooms', 'Food Mess', 'Gym'].map(ami => (
                <span key={ami} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--glass-border)' }}>
                  <CheckCircle2 size={14} color="var(--primary)" /> {ami}
                </span>
              ))}
            </div>
          </div>

          {user?.role === 'host' ? (
            <div className="glass" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid var(--primary)' }}>
              <p style={{ fontWeight: 600 }}>You are viewing this as a Host.</p>
              <button 
                onClick={() => navigate(`/edit-hostel/${id}`)}
                className="btn-primary" 
                style={{ padding: '0.8rem', fontSize: '1rem', marginTop: '1rem', width: '100%' }}
              >
                Edit This Hostel
              </button>
            </div>
          ) : message ? (
            <div className="glass" style={{ padding: '1.5rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.2)', textAlign: 'center', fontWeight: 600 }}>
              {message}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to book this hostel?')) {
                    handleBook();
                  }
                }}
                disabled={bookingLoading}
                className="btn-primary" 
                style={{ flex: 2, padding: '1.2rem', fontSize: '1.1rem' }}
              >
                {bookingLoading ? <Loader2 className="animate-spin" /> : <><Calendar size={20} /> Book Now</>}
              </button>
              
              <button 
                onClick={toggleFavourite}
                className="glass"
                style={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem',
                  color: isFavourite ? '#ec4899' : 'var(--text-main)',
                  fontWeight: 600,
                  border: isFavourite ? '1px solid #ec4899' : '1px solid var(--glass-border)'
                }}
              >
                <Heart size={20} fill={isFavourite ? "#ec4899" : "none"} />
                {isFavourite ? 'Saved' : 'Save'}
              </button>
            </div>
          )}



          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            By booking, you agree to our Terms & Conditions. No upfront payment required for visiting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
