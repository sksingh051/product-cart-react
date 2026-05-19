import { Flip, ToastContainer } from "react-toastify";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { CategoryPage } from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition={Flip}
      />
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="*"
          element={
            <h2 className="p-10 text-center text-gray-400">Page not found</h2>
          }
        />
      </Routes>
    </>
  );
}