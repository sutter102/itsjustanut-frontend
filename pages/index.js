import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`);
      const data = await res.json();
      setVideos(data);
    }

    fetchVideos();
  }, []);

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'Arial, sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>🧠 ItsJustANut.com</h1>
        <p style={{ fontSize: '1.2rem' }}>Fast. Free. Filthy.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {videos.map((video) => (
          <div key={video._id} style={{ background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', padding: '1rem' }}>
            <img
              src={video.thumb}
              alt={video.title}
              style={{ width: '100%', borderRadius: '6px' }}
            />
            <h3 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{video.title}</h3>
            <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00f0ff' }}>
              👉 Watch Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';

