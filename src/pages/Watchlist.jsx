import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";

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
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("Please log in to view your watchlist.");
      return;
    }

    setLoading(true);
    try {
      const watchlistRef = collection(db, "users", user.uid, "watchlist");
      const snapshot = await getDocs(watchlistRef);

      const coinIds = snapshot.docs.map(doc => doc.id);
      if (coinIds.length === 0) {
        setCoins([]);
        setLoading(false);
        return;
      }

      // Fetch coin market data from CoinGecko
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc&sparkline=false`
      );

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching watchlist data:", err);
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
