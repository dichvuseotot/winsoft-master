import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import AdminLayout from './components/Layout/AdminLayout.jsx'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import HoSoKSK from './pages/HoSoKSK/HoSoKSK.jsx'
import NhapDuLieu from './pages/NhapDuLieu/NhapDuLieu.jsx'
import XuatDuLieu from './pages/XuatDuLieu/XuatDuLieu.jsx'
import NhapDuLieuAPI from './pages/NhapDuLieuAPI/NhapDuLieuAPI.jsx'
import TaoHoSo from './pages/HoSoKSK/TaoHoSo.jsx'
import CaiDat from './pages/CaiDat/CaiDat.jsx'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="ho-so-ksk" element={<HoSoKSK />} />
        <Route path="ho-so-ksk/tao-moi" element={<TaoHoSo />} />
        <Route path="nhap-du-lieu" element={<NhapDuLieu />} />
        <Route path="xuat-du-lieu" element={<XuatDuLieu />} />
        <Route path="nhap-du-lieu-api" element={<NhapDuLieuAPI />} />
        <Route path="cai-dat" element={<CaiDat />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
