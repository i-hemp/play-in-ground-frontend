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
import GroundsPage from "./pages/GroundsPage";
import PageNotFound from "./pages/PageNotFound";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import BookGround from "./pages/BookGround";
import OwnerDashboard from "./pages/OwnerDashboard";
import ManageAvailability from "./pages/ManageAvailability";
import AdminApproval from "./pages/AdminApproval";

const HeaderLayout = () => (
    <div className="flex flex-col min-h-screen">
        <header>
            <NavBar />
        </header>
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
    </div>
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
                { path: "auth", element: <AuthPage /> },
                { path: "profile", element: <Profile /> },
                { path: "my-bookings", element: <MyBookings /> },
                { path: "book/:id", element: <BookGround /> },
                { path: "owner/dashboard", element: <OwnerDashboard /> },
                { path: "owner/grounds/:id/availability", element: <ManageAvailability /> },
                { path: "admin/approvals", element: <AdminApproval /> },
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

function App() {
    return (
        <div className="App">
            <RouterProvider future={{ v7_startTransition: true }} router={router} />
        </div>
    );
}

export default App;
