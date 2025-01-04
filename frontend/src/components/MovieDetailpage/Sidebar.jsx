import React, { useState, useEffect } from 'react';
import apiClient from '../apiInstance/apiInstance';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ movieId }) => {
  const [status, setStatus] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [budget, setBudget] = useState('');
  const [revenue, setRevenue] = useState('');
  const [language, setLanguage] = useState('');
  const [genres, setGenres] = useState([]);
  const [imdbId, setImdbId] = useState('');
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [productionCountries, setProductionCountries] = useState([]);
  const [backdropPath, setBackdropPath] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get(`/movie/${movieId}`);
        const movieData = response.data.data;

        const keywordsResponse = await apiClient.get(`/movie/${movieId}/keywords`);
        const keywordsData = keywordsResponse.data;

        setStatus(movieData.status);
        setReleaseDate(movieData.release_date);
        setLanguage(movieData.original_language);
        setGenres(movieData.genres);
        setImdbId(movieData.imdb_id);
        setProductionCompanies(movieData.production_companies);
        setProductionCountries(movieData.production_countries);
        setBackdropPath(movieData.backdrop_path);
        setPosterPath(movieData.poster_path);
        setTitle(movieData.title);
        setOverview(movieData.overview);
        setKeywords(keywordsData.data.keywords);
        setBudget(movieData.budget);
        setRevenue(movieData.revenue);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const formatCurrency = (value) => {
    return value ? `$${value.toLocaleString()}` : 'N/A';
  };

  const capitalizeText = (text) => {
    return text ? text.toUpperCase() : 'N/A';
  };

  const handleKeywordClick = (keywordId) => {
    navigate(`/movie/${keywordId}`);
  };

  if (loading) {
    return (
      <aside className="lg:w-76 w-full sm:w-64 max-h-screen overflow-y-auto space-y-6 p-4 sm:p-2">
        <div className="bg-white shadow p-4 rounded-md">
          <h3 className="text-lg font-bold mb-2">Loading...</h3>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="lg:w-72 w-full sm:w-64 max-h-screen overflow-y-auto space-y-6 p-4 sm:p-2">
        <div className="bg-white shadow p-4 rounded-md">
          <h3 className="text-lg font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:w-72 w-full sm:w-64 max-h-screen overflow-y-auto space-y-6 p-4 sm:p-2">
      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mt-2">{overview}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">Status</h3>
        <p>{capitalizeText(status)}</p>
        <p className="text-sm sm:text-base text-gray-600 mt-1">{releaseDate}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">Genres</h3>
        <ul className="space-y-1 sm:space-y-2">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <li key={genre.id} className="text-sm sm:text-base text-gray-800">{genre.name}</li>
            ))
          ) : (
            <li className="text-sm text-gray-600">No genres available</li>
          )}
        </ul>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">Language</h3>
        <p>{capitalizeText(language)}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">Keywords</h3>
        <ul className="space-y-1 sm:space-y-2">
          {keywords.length > 0 ? (
            keywords.map((keyword) => (
              <li
                key={keyword.id}
                className="bg-gray-200 px-2 py-1 rounded-full inline-block text-xs sm:text-sm cursor-pointer hover:bg-gray-300"
                onClick={() => handleKeywordClick(keyword.id)}
              >
                {keyword.name}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-600">No keywords available</li>
          )}
        </ul>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">Budget</h3>
        <p className="text-sm sm:text-base">{formatCurrency(budget)}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">Revenue</h3>
        <p className="text-sm sm:text-base">{formatCurrency(revenue)}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">IMDB</h3>
        <a
          href={`https://www.imdb.com/title/${imdbId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm sm:text-base text-blue-600 hover:underline"
        >
          View on IMDB
        </a>
      </div>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-md sm:text-lg font-bold mb-2">Production Companies</h3>
        <ul className="space-y-1 sm:space-y-2">
          {productionCompanies.length > 0 ? (
            productionCompanies.map((company) => (
              <li key={company.id} className="text-sm sm:text-base text-gray-800">
                {company.name}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-600">No production companies available</li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
