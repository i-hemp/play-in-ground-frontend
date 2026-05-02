import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

function DashboardLayout() {
    const { isLoggedIn } = useAuth();

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className="flex min-h-screen bg-gray-900 overflow-hidden">
            {/* Sidebar fixed for desktop */}
            <aside className="hidden lg:block w-72 h-screen sticky top-0 flex-shrink-0">
                <Sidebar />
            </aside>

            {/* Content Area */}
            <main className="flex-1 min-h-screen overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;
