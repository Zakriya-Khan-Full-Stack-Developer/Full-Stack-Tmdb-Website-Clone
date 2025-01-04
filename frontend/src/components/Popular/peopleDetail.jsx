import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiInstance/apiInstance';

const PersonDetail = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const backendUrl = "https://movie-appnetlify.vercel.app/api/v3/tmdb";

  const [personData, setPersonData] = useState(null);
  const [creditsData, setCreditsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [personResponse, creditsResponse] = await Promise.all([
          apiClient.get(`/person/${personId}`),
          apiClient.get(`/person/${personId}/combined_credits`)
        ]);
        setPersonData(personResponse.data.data);
        setCreditsData(creditsResponse.data.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [personId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-900">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto p-6 lg:p-12">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row items-center bg-gray-100 rounded-lg shadow-lg p-6 lg:p-10 min-h-screen">
          <div className="flex justify-center lg:w-1/3">
            <img
              src={personData?.profile_path
                ? `https://image.tmdb.org/t/p/w500${personData.profile_path}`
                : `https://via.placeholder.com/500x750?text=No+Image`}
              alt={personData?.name || 'Person'}
              className="rounded-lg shadow-md w-48 h-72 object-cover border-4 border-gray-300"
            />
          </div>
          <div className="lg:w-2/3 lg:ml-8 mt-6 lg:mt-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{personData?.name || 'Unknown Name'}</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">{personData?.known_for_department || 'Unknown Department'}</p>
            <p className="mt-4"><strong>Born:</strong> {personData?.birthday ? new Date(personData?.birthday).toLocaleDateString() : 'Unknown'}</p>
            <p><strong>Place of Birth:</strong> {personData?.place_of_birth || 'Unknown'}</p>
            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Biography</h2>
              <p className="text-gray-700 mt-2">
                {typeof personData?.biography === 'string'
                  ? showFullBio
                    ? personData?.biography
                    : `${personData?.biography?.substring(0, 200)}...`
                  : 'Biography unavailable'}
              </p>
              {personData?.biography?.length > 200 && (
                <button
                  className="text-red-500 hover:underline mt-2"
                  onClick={() => setShowFullBio(!showFullBio)}
                >
                  {showFullBio ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Known For Section */}
        <div className="mt-12 bg-gray-100 rounded-lg shadow-lg p-6 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Known For</h2>
          <div className="flex gap-6 mt-4 overflow-x-auto pb-4">
            {Array.isArray(creditsData?.cast) && creditsData.cast.slice(0, 10).map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-48 flex-shrink-0 bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 transform hover:scale-105"
                onClick={() => navigate(item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`)}
              >
                <img
                  src={item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : `https://via.placeholder.com/500x750?text=No+Image`}
                  alt={item.title || item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{item.title || item.name}</h3>
                  <p className="text-xs text-gray-500">{item.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Filmography Section */}
        <div className="mt-12 bg-gray-100 rounded-lg shadow-lg p-6 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Full Filmography</h2>
          <div className="mt-4 max-h-96 overflow-y-auto text-gray-700">
            {Array.isArray(creditsData?.cast) && creditsData.cast
              .sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date))
              .map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-center py-2 border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                  onClick={() => navigate(item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`)}
                >
                  <p className="text-sm sm:text-base font-medium text-gray-900">{item.title || item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.release_date
                      ? new Date(item.release_date).getFullYear()
                      : 'Unknown Year'}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
