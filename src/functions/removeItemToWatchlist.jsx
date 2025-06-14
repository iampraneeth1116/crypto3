export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
  e.preventDefault();
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const newList = watchlist.filter((coin) => coin != id);
  setIsCoinAdded(false);
  localStorage.setItem("watchlist", JSON.stringify(newList));
};