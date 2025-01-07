import React from 'react';

const BannerAd = () => {
    return (
        <a
            href="https://kuchazoaphailr.net/4/8754595?var=your_source_id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'block',
                textAlign: 'center',
                margin: '20px auto',
                padding: '10px',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                textDecoration: 'none',
            }}
        >
            <img
                src="/path-to-your-image/banner-image.jpg"
                alt="Special Offer"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                }}
            />
            <p style={{ marginTop: '10px', color: '#333' }}>Click to view exclusive offers!</p>
        </a>
    );
};

export default BannerAd;
