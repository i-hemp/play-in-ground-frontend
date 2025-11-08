import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GroundsPage from "./pages/GroundPage";
import PageNotFound from "./pages/PageNotFound";

const HeaderLayout = () => (
  <>
    <header>
      <NavBar />
    </header>
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HeaderLayout />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "grounds", element: <GroundsPage /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App(props) {
  return (
    <div className="App">
      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </div>
  );
}

export default App;
