import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./commentSlice"; // Importation du reducer
// Création du store Redux
const store = configureStore({
    reducer: {
        comment: commentReducer, // Associe le reducer des commentaires
    },
});
export default store;