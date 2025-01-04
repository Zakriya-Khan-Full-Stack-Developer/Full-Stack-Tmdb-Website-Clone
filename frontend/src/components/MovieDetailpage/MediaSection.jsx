import React, { useState, useEffect } from 'react';
import apiClient from '../apiInstance/apiInstance';

const MediaSection = ({ movieId }) => {
  const [media, setMedia] = useState({
    videos: [],
    backdrops: [],
    posters: [],
  });

  const [activeTab, setActiveTab] = useState('Videos');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMediaData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/movie/${movieId}/media`);
        setMedia({
          videos: response.data.data.videos || [],
          backdrops: response.data.data.backdrops || [],
          posters: response.data.data.posters || [],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching media data:', error);
        setLoading(false);
      }
    };

    fetchMediaData();
  }, [movieId]);

  const tabs = [
    { label: 'Videos', key: 'videos', count: media.videos.length },
    { label: 'Backdrops', key: 'backdrops', count: media.backdrops.length },
    { label: 'Posters', key: 'posters', count: media.posters.length },
  ];

  const handleVideoClick = (videoKey) => {
    setSelectedTrailer(videoKey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrailer(null);
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Videos':
        return (
          <div className="flex overflow-x-auto gap-4 py-4">
            {media.videos.map((video, index) => (
              <div key={index} className="cursor-pointer flex-shrink-0">
                <div className="relative">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={`Video ${index + 1}`}
                    onClick={() => handleVideoClick(video.key)}
                    className="w-full h-40 sm:h-48 object-cover rounded-md shadow-lg transition-transform hover:scale-105"
                  />
                  <button
                    onClick={() => handleVideoClick(video.key)}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl opacity-0 hover:opacity-100 transition-opacity"
                  >
                    ▶
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'Backdrops':
        return (
          <div className="flex overflow-x-auto gap-4 py-4">
            {media.backdrops.map((backdrop, index) => (
              <div
                key={index}
                className="cursor-pointer flex-shrink-0"
                onClick={() => openImageModal(`https://image.tmdb.org/t/p/original${backdrop.file_path}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                  alt={`Backdrop ${index + 1}`}
                  className="w-full h-40 sm:h-48 object-cover rounded-md shadow-lg"
                />
              </div>
            ))}
          </div>
        );
      case 'Posters':
        return (
          <div className="flex overflow-x-auto gap-4 py-4">
            {media.posters.map((poster, index) => (
              <div
                key={index}
                className="cursor-pointer flex-shrink-0"
                onClick={() => openImageModal(`https://image.tmdb.org/t/p/original${poster.file_path}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                  alt={`Poster ${index + 1}`}
                  className="w-full h-40 sm:h-48 object-cover rounded-md shadow-lg"
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Media</h2>

      <div className="mb-4">
        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.label)}
              className={`py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all text-sm sm:text-base ${
                activeTab === tab.label
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.label} {tab.count > 0 && <span className="ml-2 text-xs">({tab.count})</span>}
            </button>
          ))}
        </div>
      </div>

      <div>{loading ? <div className="text-center text-white">Loading...</div> : renderContent()}</div>

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <div
            className="relative p-4 rounded-lg w-11/12 sm:w-3/4 max-w-3xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 text-white bg-black p-2 rounded-full focus:outline-none"
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Selected Full View"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isModalOpen && selectedTrailer && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative p-4 rounded-lg w-11/12 sm:w-full max-w-4xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black p-2 rounded-full focus:outline-none"
            >
              X
            </button>
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSection;
