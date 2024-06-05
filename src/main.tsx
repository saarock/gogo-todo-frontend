import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {
  HomePage,
  ContactPage,
  LoginPage,
  AboutPage,
  DashBoard,
  RegisterPage,
} from "./pages/index.ts";
import { ProtectedRoute } from "./components";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<ProtectedRoute children={<LoginPage />} />} />
      <Route path="/register" element={<ProtectedRoute children={<RegisterPage />} />} />
      <Route
        path="/dash"
        element={<ProtectedRoute children={<DashBoard />} />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
