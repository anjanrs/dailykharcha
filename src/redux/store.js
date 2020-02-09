import { applyMiddleware, createStore, compose } from "redux";
// import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./saga";
import expenseTypePageMiddleWare from "../pages/ExpenseTypeListPage/middleware";
import dailyExpenesePageMiddleWare from "../pages/DailyExpenseListPage/middleware";
import expenseByExpenseTypeMiddleWare from "../pages/ExpensesByExpenseTypeListPage/middleware";
import expenseBySubExpenseTypeMiddleWare from "../pages/ExpensesBySubExpenseTypeListPage/middleware";
import expenseDetailPageMiddleware from "../pages/ExpenseDetailPage/middleware";
import menuItemListPageMiddleWare from "../pages/MenuItemListPage/middleware";
import accessPerUserDetailPageMiddleware from "../pages/AccessPerUserDetailPage/middleware";
import accessPerUseGroupDetailPageMiddleware from "../pages/AccessPerUserGroupDetailPage/middleware";

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  expenseTypePageMiddleWare,
  dailyExpenesePageMiddleWare,
  expenseByExpenseTypeMiddleWare,
  expenseBySubExpenseTypeMiddleWare,
  expenseDetailPageMiddleware,
  menuItemListPageMiddleWare,
  accessPerUserDetailPageMiddleware,
  accessPerUseGroupDetailPageMiddleware,
  sagaMiddleware
  // createLogger()
);

const enhancer = compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);
