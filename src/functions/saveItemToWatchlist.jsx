

export const saveItemToWatchlist = (e, id) => {
  e.preventDefault();
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));

  if (watchlist) {
    if (!watchlist.includes(id)) {
      watchlist.push(id);
    }
  } else {
    watchlist = [id];
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
};
