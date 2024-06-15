import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import router from "./App.tsx";



// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route index path="" element={<HomePage />} />
//       <Route path="/contact" element={<ContactPage />} />
//       <Route path="/about" element={<AboutPage />} />
//       <Route path="/login" element={<ProtectedRoute children={<LoginPage />} />} />
//       <Route path="/register" element={<ProtectedRoute children={<RegisterPage />} />} />
//       <Route path="/register" element={<ProtectedRoute children={<RegisterPage />} />} />
//       <Route path="/dash/projects/" element={<ProtectedRoute children={<Project />} />} />
//       <Route
//         path="/dash"
//         element={<ProtectedRoute children={<DashBoard />} />}
//       />

//       <Route
//         path="/dash/projects/:productname"

//         element={<ProtectedRoute children={<Product />} />}
//       />

//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
