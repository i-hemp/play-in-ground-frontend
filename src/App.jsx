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
import MyBookings from "./pages/MyBookings";
import BookGround from "./pages/BookGround";
import BookingDetails from "./pages/BookingDetails";
import DashboardLayout from "./layouts/DashboardLayout";
import PlayerDashboard from "./pages/PlayerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import { useAuth } from "./context/AuthContext";

// Simple index redirector for the dashboard
const DashboardIndex = () => {
    const { userRole } = useAuth();
    if (userRole === 'owner') return <OwnerDashboard />;
    return <PlayerDashboard />;
};

const HeaderLayout = () => (
    <div className="flex flex-col min-h-screen bg-gray-900">
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
                { path: "grounds/:id", element: <BookGround /> },
                { path: "about", element: <About /> },
                { path: "contact", element: <Contact /> },
                { path: "auth", element: <AuthPage /> },
                { path: "my-bookings", element: <Navigate to="/dashboard/history" /> },
                { path: "profile", element: <Navigate to="/dashboard" /> },
                { path: "*", element: <PageNotFound /> },
            ],
        },
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { index: true, element: <DashboardIndex /> },
                { path: "history", element: <MyBookings /> },
                { path: "booking/:id", element: <BookingDetails /> },
                { path: "grounds", element: <OwnerDashboard /> }, // Reusing for now
                { path: "*", element: <Navigate to="/dashboard" /> }
            ]
        }
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
