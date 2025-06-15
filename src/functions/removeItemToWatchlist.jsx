import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";

export const removeItemFromWatchlist = async (e, userId, coinId, setIsCoinAdded) => {
  e.preventDefault();

  try {
    const coinRef = doc(db, "users", userId, "watchlist", coinId);
    await deleteDoc(coinRef);

    setIsCoinAdded(false);
    console.log("Coin removed from watchlist");
  } catch (error) {
    console.error("Error removing coin from watchlist:", error);
  }
};
