import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.jsx'
import './Sidebar.css'

const NAV_SECTIONS = [
  {
    label: 'Tổng quan',
    items: [
      { path: '/',               icon: 'bi-grid-1x2-fill',     label: 'Trang chủ',         exact: true },
    ],
  },
  {
    label: 'Dữ liệu y tế',
    items: [
      { path: '/ho-so-ksk',      icon: 'bi-file-earmark-medical-fill', label: 'Hồ Sơ KSK' },
      { path: '/nhap-du-lieu',   icon: 'bi-cloud-upload-fill',  label: 'Nhập dữ liệu' },
      { path: '/xuat-du-lieu',   icon: 'bi-cloud-download-fill',label: 'Xuất dữ liệu' },
      { path: '/nhap-du-lieu-api', icon: 'bi-diagram-3-fill',  label: 'Nhập dữ liệu từ API' },
    ],
  },
]

export default function Sidebar({ collapsed, mobileOpen, onOverlayClick, onLogout }) {
  const { user, getInitials } = useAuth()
  const navigate = useNavigate()

  const sidebarClass = [
    'sidebar',
    collapsed ? 'collapsed' : '',
    mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
            <div
        className={`sidebar-overlay${mobileOpen ? ' visible' : ''}`}
        onClick={onOverlayClick}
      />

      <aside className={sidebarClass}>
                <div className="sidebar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="sidebar-logo">
            <img src="/images/logo.png" alt="e-MedLink" style={{ width: 26, height: 26, objectFit: 'contain' }} />
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-name">e-MedLink</div>
            <div className="sidebar-brand-sub">KSK toàn dân Thành phố Đồng Nai</div>
          </div>
        </div>

                <nav className="sidebar-nav">
          {NAV_SECTIONS.map((section, si) => (
            <div key={si}>
              <div className="nav-section-label">{section.label}</div>
              {section.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                >
                  <i className={`bi ${item.icon} nav-icon`} />
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              ))}
              {si < NAV_SECTIONS.length - 1 && <div className="nav-divider" />}
            </div>
          ))}
        </nav>

                <div className="sidebar-user" onClick={onLogout} title="Đăng xuất">
          <div className="sidebar-avatar">
            {getInitials(user?.fullName || user?.username || 'U')}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div className="sidebar-user-name">{user?.fullName || user?.username}</div>
            
          </div>
          <i className="bi bi-box-arrow-right sidebar-logout-icon" style={{ color: 'rgba(255,255,255,.5)', fontSize: '.9rem', flexShrink: 0 }} />
        </div>
      </aside>
    </>
  )
}
