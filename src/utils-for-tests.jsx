import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./Redux/Store";


export function renderWithProviders(
    ui,
    {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = configureStore({
        reducer: reducer,
        preloadedState,
      }),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>;
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
  }