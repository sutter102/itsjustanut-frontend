import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`)
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error('Failed to fetch videos:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#000', padding: '1rem 2rem', borderBottom: '2px solid #ff9800' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#ff9800' }}>ItsJustANut</h1>
        <p style={{ marginTop: '0.25rem', color: '#ccc' }}>Fast. Free. Filthy.</p>
      </header>

      <section style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Featured Videos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {videos.map((video) => (
            <div key={video._id} style={{ background: '#1a1a1a', borderRadius: '10px', overflow: 'hidden' }}>
              <img src={video.thumb} alt={video.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{video.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#999' }}>{video.category || 'Uncategorized'} • {video.duration || '0:00'}</p>
                <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ color: '#03a9f4', display: 'inline-block', marginTop: '0.5rem' }}>
                  Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
