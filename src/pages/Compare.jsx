import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer/footer";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import { MenuItem, Select, IconButton } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import "./Compare.css";


function Compare() {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCoins, setSelectedCoins] = useState([
    { id: "bitcoin", data: {} },
    { id: "ethereum", data: {} }
  ]);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await response.json();


      const sortedCoins = data.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      setAllCoins(sortedCoins);

      const updatedCoins = selectedCoins.map(coin => ({
        ...coin,
        data: sortedCoins.find(c => c.id === coin.id) || {}
      }));
      setSelectedCoins(updatedCoins);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleCoinChange = (event, index) => {
    const newCoins = [...selectedCoins];
    newCoins[index] = {
      id: event.target.value,
      data: allCoins.find(coin => coin.id === event.target.value) || {}
    };
    setSelectedCoins(newCoins);
  };

  const addCoin = () => {
    if (selectedCoins.length < 4) {
      setSelectedCoins([...selectedCoins, { id: "", data: {} }]);
    }
  };

  const removeCoin = (index) => {
    if (selectedCoins.length > 2) {
      const newCoins = selectedCoins.filter((_, i) => i !== index);
      setSelectedCoins(newCoins);
    }
  };


  const menuStyles = {
    PaperProps: {
      style: {
        maxHeight: 500,
        backgroundColor: "var(--darkgrey)",
        color: 'var(--white)'
      }
    }
  };
  
  return (
    <div className="compare-container">
      <Header />
      <div className="compare-content">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="select-flex">
              {selectedCoins.map((coin, index) => (
                <div key={index} className="select-coin-container">
                  <Select
                    value={coin.id}
                    onChange={(e) => handleCoinChange(e, index)}
                    className="select-coin"
                    MenuProps={menuStyles}
                  >
                    {allCoins.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {index > 1 && (
                    <IconButton onClick={() => removeCoin(index)} className="remove-coin">
                      <RemoveCircleOutlineRoundedIcon />
                    </IconButton>
                  )}
                </div>
              ))}
              {selectedCoins.length < 4 && (
                <IconButton onClick={addCoin} className="add-coin">
                  <AddCircleOutlineRoundedIcon />
                </IconButton>
              )}
            </div>
            <div className="compare-wrapper">
              {selectedCoins.map((coin, index) => (
                coin.data?.id && (
                  <div key={index} className="grey-wrapper">
                    <List coin={coin.data} />
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Compare;
