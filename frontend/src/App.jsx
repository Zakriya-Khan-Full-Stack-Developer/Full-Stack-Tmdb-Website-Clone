import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx"; // Import the Header component
import SearchBar from "./components/SearchBarContainer/SearchContainer.jsx"; // Import the SearchBar component
import TrendingContainer from "./components/Trending/TrendingFront.jsx"; // Import the TrendingContainer component
import LatestTrailers from "./components/LatestTrailers/LatestTrailers.jsx"; // Import the LatestTrailers component
import PopularSection from "./components/Popular/popular.jsx"; // Import the PopularSection component
import MoviePage from "./components/MovieDetailpage/DetailPage.jsx"; // Import the MoviePage component
import MovieList from "./components/MovieList/MovieList.jsx"; // Import the MovieList component
import PopularPeopleList from "./components/Popular/listpeople.jsx"; // Import the PopularPeopleList component
import PersonDetail from "./components/Popular/peopleDetail.jsx"; // Import the PersonDetail component
import SearchList from "./components/SearchBarContainer/saerchlist.jsx"; // Import the SearchList component
import QuizUi from "./components/Quiz/QuizUi.jsx";
import Login from "./components/Authentication/Login.jsx"; // Import the Login component
import Register from "./components/Authentication/Register.jsx"; // Import the Register component
import LeaderBoard from "./components/LeaderBoard/LeaderBoard.jsx";
import { ToastContainer } from "react-toastify";
import LeaderBoardDetail from "./components/LeaderBoard/LeaderBoardDetail.jsx";
import "./App.css"; // Adjust the path if necessary

// Redirect Component
  return (
  

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage the toggle state for the menu

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle the menu state

  return (
    <Router>
      <div>
     

        <ToastContainer
          position="top-right"
          autoClose={2000} // Toast disappears after 2 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Custom background
            borderRadius: "10px", // Rounded corners
            padding: "10px",
          }}
        />

        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <TrendingContainer />
                <LatestTrailers />
                <PopularSection />
                <LeaderBoard />
              </>
            }
          />

          {/* Movie Page Route */}
          <Route path="/movie/:movieId" element={<MoviePage />} />

          {/* Movie List Route */}
          <Route path="/list/:type/:category/:page" element={<MovieList />} />

          {/* Popular People Route */}
          <Route path="/popular-people" element={<PopularPeopleList />} />

          {/* Person Detail Route */}
          <Route path="/person/:personId" element={<PersonDetail />} />

          {/* Search List Route */}
          <Route path="/search-list" element={<SearchList />} />
          <Route path="/leaderboard" element={<LeaderBoardDetail />} />

          {/* Quiz Section Route */}
          <Route path="/quiz" element={<QuizUi />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Redirect Route */}
          <Route path="/redirect-to-offer" element={<RedirectToOffer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
