import React, { useState, useEffect } from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { convertNumber } from "../../../functions/convertNumber";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemFromWatchlist } from "../../../functions/removeItemToWatchlist";

function List({ coin, delay }) {
  /**
   * State controls whether the star icon is filled.
   * We don't read from localStorage anymore; instead we listen
   * to Firestore so the UI stays in‑sync across devices/tabs.
   */
  const [isCoinAdded, setIsCoinAdded] = useState(false);

  // Firebase Auth — assumes auth flow already set up in the app root.
  const auth = getAuth();
  const user = auth.currentUser;

  /**
   * Real‑time subscription: whenever the document for this coin exists
   * in the user's watchlist sub‑collection, we mark it as added.
   */
  useEffect(() => {
    if (!user) return; // guard for unauthenticated visitors

    const coinRef = doc(db, "users", user.uid, "watchlist", coin.id);
    const unsubscribe = onSnapshot(coinRef, (snap) => {
      setIsCoinAdded(snap.exists());
    });

    return () => unsubscribe();
  }, [user, coin.id]);

  /**
   * Toggle handler — delegates persistence to the helper functions that
   * write to / delete from Firestore.
   */
  const handleWatchlistClick = async (e) => {
    e.preventDefault();

    if (!user) {
      console.warn("Please log in to manage your watchlist");
      return;
    }

    try {
      if (isCoinAdded) {
        await removeItemFromWatchlist(e, user.uid, coin.id, setIsCoinAdded);
      } else {
        await saveItemToWatchlist(e, user.uid, coin);
        setIsCoinAdded(true);
      }
    } catch (err) {
      console.error("Error updating watchlist:", err);
    }
  };

  // Defensive fallbacks prevent UI from crashing on undefined fields.
  const safePrice = coin?.price_change_percentage_24h ?? 0;
  const isPriceUp = safePrice >= 0;
  const safeTotalVolume = coin?.total_volume ?? 0;
  const safeMarketCap = coin?.market_cap ?? 0;
  const safeCurrentPrice = coin?.current_price ?? 0;

  return (
    <motion.tr
      className="list-row"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Tooltip title="Coin Image">
        <td className="td-img">
          <img
            src={coin?.image}
            className="coin-image coin-image-td"
            alt={coin?.name || "crypto coin"}
          />
        </td>
      </Tooltip>

      <Tooltip title="Coin Info" placement="bottom-start">
        <td className="td-info">
          <div className="info-flex">
            <p className="coin-symbol td-p">{coin.symbol}</p>
            <p className="coin-name td-p">{coin.name}</p>
          </div>
        </td>
      </Tooltip>

      <Tooltip title="Coin Price Percentage In 24hrs" placement="bottom-start">
        <td>
          <div className="chip-flex">
            <div className={`price-chip ${!isPriceUp && "red"}`}>{safePrice.toFixed(2)}%</div>
            <div className={`chip-icon td-chip-icon ${!isPriceUp && "red"}`}>
              {isPriceUp ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
            </div>
          </div>
        </td>
      </Tooltip>

      <Tooltip title="Coin Price In USD" placement="bottom-end">
        <td className={isPriceUp ? "current-price td-current-price" : "current-price-red td-current-price"}>
          ${safeCurrentPrice.toLocaleString()}
        </td>
      </Tooltip>

      <Tooltip title="Coin Total Volume" placement="bottom-end">
        <td className="coin-name td-totalVolume">{safeTotalVolume.toLocaleString()}</td>
      </Tooltip>

      <Tooltip title="Coin Market Capital" placement="bottom-end">
        <td className="coin-name td-marketCap">${safeMarketCap.toLocaleString()}</td>
      </Tooltip>

      {/* Compact market‑cap on mobile */}
      <td className="coin-name mobile">${convertNumber(safeMarketCap)}</td>

      {/* Star icon — toggles watchlist */}
      <td
        className={`watchlist-icon ${safePrice < 0 && "watchlist-icon-red"}`}
        onClick={handleWatchlistClick}
      >
        {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
      </td>
    </motion.tr>
  );
}

export default List;
