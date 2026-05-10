import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MapPin, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="animate-fade-in" style={{ padding: '3rem 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
        Find Your Perfect <br />
        <span style={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Home Away From Home
        </span>
      </h1>
      <p className="hero-text" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto 2.5rem' }}>
        Discover premium hostels with modern amenities, verified hosts, and a community that feels like family.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
        <Link to="/hostels" className="btn-primary" style={{ padding: '0.8rem 2rem' }}>
          Explore Hostels <ArrowRight size={18} />
        </Link>
        <Link to="/signup" className="glass" style={{ 
          padding: '0.8rem 2rem', 
          fontSize: '1rem', 
          fontWeight: 600,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px'
        }}>
          Become a Host
        </Link>
      </div>

      <div className="container grid-cols-3" style={{ gap: '1.5rem' }}>
        {[
          { icon: <ShieldCheck color="#6366f1" size={28} />, title: 'Verified Hosts', desc: 'Every property is hand-picked and verified.' },
          { icon: <MapPin color="#ec4899" size={28} />, title: 'Prime Locations', desc: 'Stay close to your university or workplace.' },
          { icon: <Zap color="#8b5cf6" size={28} />, title: 'Instant Booking', desc: 'Secure your spot in minutes, no hassle.' },
        ].map((feat, i) => (
          <div key={i} className="glass" style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ marginBottom: '0.8rem' }}>{feat.icon}</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{feat.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default Hero;
