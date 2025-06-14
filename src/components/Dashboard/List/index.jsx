import React, { useState } from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { convertNumber } from "../../../functions/convertNumber";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";


function List({ coin, delay }) {
  const [isCoinAdded, setIsCoinAdded] = useState(() => {
    try {
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      return watchlist.includes(coin?.id);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return false;
    }
  });


  const safePrice = coin?.price_change_percentage_24h ?? 0;
  const isPriceUp = safePrice >= 0;
  const safeTotalVolume = coin?.total_volume ?? 0;
  const safeMarketCap = coin?.market_cap ?? 0;
  const safeCurrentPrice = coin?.current_price ?? 0;

  const handleWatchlistClick = (e) => {
    try {
      if (isCoinAdded) {
        removeItemToWatchlist(e, coin.id, setIsCoinAdded);
      } else {
        setIsCoinAdded(true);
        saveItemToWatchlist(e, coin.id);
      }
    } catch (error) {
      console.error("Error handling watchlist:", error);
    }
  };

  return (
    <motion.tr
      className="list-row"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay }}
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
      <Tooltip
        title="Coin Price Percentage In 24hrs"
        placement="bottom-start"
      >
        {isPriceUp ? (
          <td>
            <div className="chip-flex">
              <div className={`price-chip ${!isPriceUp && "red"}`}>
                {safePrice.toFixed(2)}%
              </div>
              <div className="chip-icon td-chip-icon">
                <TrendingUpRoundedIcon />
              </div>
            </div>
          </td>
        ) : (
          <td>
            <div className="chip-flex">
              <div className={`price-chip ${!isPriceUp && "red"}`}>
                {safePrice.toFixed(2)}%
              </div>
              <div className="chip-icon td-chip-icon red">
                <TrendingDownRoundedIcon />
              </div>
            </div>
          </td>
        )}
      </Tooltip>
      <Tooltip title="Coin Price In USD" placement="bottom-end">
        {coin.price_change_percentage_24h >= 0 ? (
          <td className="current-price  td-current-price">
            ${safeCurrentPrice.toLocaleString()}
          </td>
        ) : (
          <td className="current-price-red td-current-price">
            ${safeCurrentPrice.toLocaleString()}
          </td>
        )}
      </Tooltip>
      <Tooltip title="Coin Total Volume" placement="bottom-end">
        <td className="coin-name td-totalVolume">
          {safeTotalVolume.toLocaleString()}
        </td>
      </Tooltip>
      <Tooltip title="Coin Market Capital" placement="bottom-end">
        <td className="coin-name td-marketCap">
          ${safeMarketCap.toLocaleString()}
        </td>
      </Tooltip>
      <td className="coin-name mobile">${convertNumber(safeMarketCap)}</td>
      <td
        className={`watchlist-icon ${
          safePrice < 0 && "watchlist-icon-red"
        }`}
        onClick={handleWatchlistClick}
      >
        {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
      </td>
    </motion.tr>
  );
}

export default List;