import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Image as ImageIcon, MapPin, IndianRupee, Loader2, Save } from 'lucide-react';

const AddHostel = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    homeName: '',
    address: '',
    city: '',
    price: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const fetchHostel = async () => {
        setFetching(true);
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
          const res = await axios.get(`${apiUrl}/host/edit-hostel/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setFormData({
            homeName: res.data.homeName,
            address: res.data.address,
            city: res.data.city,
            price: res.data.price
          });
        } catch (err) {
          console.error(err);
          alert('Failed to fetch hostel details');
        } finally {
          setFetching(false);
        }
      };
      fetchHostel();
    }
  }, [id, isEdit, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('homeName', formData.homeName);
    data.append('address', formData.address);
    data.append('city', formData.city);
    data.append('price', formData.price);
    if (image) data.append('image', image);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      if (isEdit) {
        await axios.put(`${apiUrl}/host/edit-hostel/${id}`, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post(`${apiUrl}/host/add-hostel`, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      navigate('/hostels');
    } catch (err) {
      console.error(err);
      alert(`Failed to ${isEdit ? 'update' : 'add'} hostel`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="animate-spin" size={48} color="var(--primary)" /></div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
      <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{isEdit ? 'Update Your Hostel' : 'List Your Hostel'}</h2>
        <p className="hero-text" style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>{isEdit ? 'Update the details below.' : 'Fill in the details to reach potential guests.'}</p>

        <form onSubmit={handleSubmit} className="grid-cols-2" style={{ gap: '1.2rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Hostel Name</label>
            <input 
              type="text" 
              placeholder="e.g. Skyline Residency" 
              className="form-input"
              required
              value={formData.homeName}
              onChange={(e) => setFormData({...formData, homeName: e.target.value})}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Full Address</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
              <textarea 
                placeholder="Street address, landmark..." 
                className="form-input"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                style={{ paddingLeft: '3rem', minHeight: '80px', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          <div className="grid-cols-1">
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>City</label>
            <input 
              type="text" 
              placeholder="e.g. Mumbai" 
              className="form-input"
              required
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>

          <div className="grid-cols-1">
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Price /mo</label>
            <div style={{ position: 'relative' }}>
              <IndianRupee size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="number" 
                placeholder="Amount" 
                className="form-input"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Hostel Image {isEdit && '(Leave blank to keep current)'}</label>
            <label className="glass" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '1.5rem', 
              background: 'rgba(255,255,255,0.02)', 
              border: '2px dashed var(--glass-border)', 
              borderRadius: '16px', 
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}>
              <ImageIcon size={28} color="var(--text-muted)" style={{ marginBottom: '0.4rem' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{image ? image.name : 'Upload image'}</span>
              <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ gridColumn: 'span 2', padding: '1rem' }}>
            {loading ? <Loader2 className="animate-spin" /> : isEdit ? <><Save size={18} /> Update Hostel</> : <><Plus size={18} /> Publish Hostel</>}
          </button>
        </form>
      </div>
    </div>
  );

};

export default AddHostel;

