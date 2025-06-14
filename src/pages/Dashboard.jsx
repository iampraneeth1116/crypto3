import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import Search from "../components/Dashboard/Search";
import TabsComponent from "../components/Dashboard/Tabs";
import TopButton from "../components/Common/TopButton";
import Footer from "../components/Common/Footer/footer";
import PaginationComponent from "../components/Dashboard/Pagination";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();

      setCoins(data);
      setPaginatedCoins(data.slice(0, 10));
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    var initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">
          Error loading data: {error}
        </div>
      ) : (
        <>
          <Search search={search} handleChange={handleChange} />
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            setSearch={setSearch}
          />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
              count={Math.ceil(coins.length / 10)} 
            />
          )}
        </>
      )}
      <TopButton />
      <Footer />
    </>
  );
}

export default Dashboard;