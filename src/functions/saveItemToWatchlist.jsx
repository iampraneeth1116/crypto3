import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";

export const saveItemToWatchlist = async (e, userId, coin) => {
  e.preventDefault();

  try {
    // Save coin to user's watchlist with coin.id as document ID
    const coinRef = doc(db, "users", userId, "watchlist", coin.id);
    await setDoc(coinRef, coin); // coin = { id: 'bitcoin', name: 'Bitcoin', ... }

    console.log("Coin added to watchlist");
  } catch (error) {
    console.error("Error adding coin to watchlist:", error);
  }
};
