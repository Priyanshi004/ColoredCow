import { Link, useLocation } from 'react-router-dom'
import { Home, ClipboardList, LogOut, User } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const SidebarItem = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-6 py-4 transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white shadow-lg border-r-4 border-white'
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
)

export default function Sidebar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/logout')
    } catch (err) {
      console.error('Logout failed', err)
    } finally {
      dispatch(logout())
      navigate('/login')
    }
  }

  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col shadow-2xl z-20">
      <div className="p-8 pb-12">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ClipboardList size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Hiring Hero</span>
        </div>
      </div>

      <nav className="flex-1">
        <SidebarItem
          to="/dashboard"
          icon={Home}
          label="Dashboard"
          active={location.pathname === '/dashboard'}
        />
        <SidebarItem
          to="/applications"
          icon={ClipboardList}
          label="Applications"
          active={location.pathname.startsWith('/applications')}
        />
      </nav>

      <div className="p-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-2"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
