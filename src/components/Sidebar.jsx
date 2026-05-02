import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    LayoutDashboard, 
    History, 
    PlusCircle, 
    Settings, 
    LogOut,
    Home,
    MapPin,
    Trophy
} from 'lucide-react';

function Sidebar() {
    const { userRole, logout, userInitial } = useAuth();
    const location = useLocation();

    const menuItems = userRole === 'owner' ? [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Grounds', path: '/dashboard/grounds', icon: MapPin },
        { name: 'Add Ground', path: '/dashboard/add-ground', icon: PlusCircle },
        { name: 'Bookings', path: '/dashboard/bookings', icon: History },
        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ] : [
        { name: 'My Profile', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Booking History', path: '/dashboard/history', icon: History },
        { name: 'Browse Grounds', path: '/grounds', icon: Home },
        { name: 'Achievements', path: '/dashboard/achievements', icon: Trophy },
        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="h-full bg-gray-800 border-r border-gray-700 flex flex-col pt-8">
            <div className="px-6 mb-10">
                <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-bold text-black text-xl">
                        {userInitial}
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{userRole}</p>
                        <p className="text-sm font-bold text-white">Dashboard</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                                isActive 
                                ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' 
                                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-4 text-red-400 hover:bg-red-500/5 rounded-2xl transition-colors font-semibold"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
