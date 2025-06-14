import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Loader from "../components/Common/Loader";
import Footer from "../components/Common/Footer/footer"; 

import "./Watchlist.css";

function WatchlistView() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWatchlistData();
  }, []);

  const fetchWatchlistData = async () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (watchlist.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      const watchlistCoins = data.filter((coin) => watchlist.includes(coin.id));
      setCoins(watchlistCoins);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="watchlist-container">
      <Header />
      <div className="watchlist-content">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="watchlist-error">{error}</div>
        ) : coins.length === 0 ? (
          <div className="watchlist-empty">
            <h1>Your Watchlist is Empty</h1>
            <p>Start tracking your favorite cryptocurrencies by adding them to your watchlist.</p>
            <Link to="/dashboard" className="browse-link">Browse Coins</Link>
          </div>
        ) : (
          <TabsComponent coins={coins} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default WatchlistView;
