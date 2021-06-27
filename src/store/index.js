import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { rootReducer, rootSaga } from "./ducks";

const logger = createLogger({
  collapsed: true,
  duration: true,
});
function configureAppStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, logger],
    // devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("./ducks", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return { store };
}

export const { store } = configureAppStore();
