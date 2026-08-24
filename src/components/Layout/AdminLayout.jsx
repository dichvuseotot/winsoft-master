import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import Header from './Header/Header.jsx'
import './AdminLayout.css'

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isMobile = () => window.innerWidth <= 768

  const handleToggle = () => {
    if (isMobile()) {
      setMobileOpen(p => !p)
    } else {
      setCollapsed(p => !p)
    }
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Đăng xuất?',
      text: 'Bạn có chắc muốn đăng xuất khỏi hệ thống?',
      icon: 'question',
      iconColor: '#0067AC',
      showCancelButton: true,
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Huỷ',
      confirmButtonColor: '#0067AC',
      cancelButtonColor: '#64748b',
      reverseButtons: true,
      borderRadius: '14px',
    })
    if (result.isConfirmed) {
      logout()
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="layout-shell">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onOverlayClick={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <div className={`layout-body${collapsed ? ' collapsed' : ''}`}>
        <Header onToggleSidebar={handleToggle} onLogout={handleLogout} />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
