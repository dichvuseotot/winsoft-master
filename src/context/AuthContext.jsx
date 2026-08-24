import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'ksk_nhabe_user'
const TOKEN_KEY   = 'ksk_nhabe_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [loading, setLoading] = useState(false)

  const login = useCallback(async (username, password, remember) => {
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 800))

      const mockUser = {
        id: 1,
        username,
        fullName: 'Nguyễn Hoàng Nghĩa',
        role: 'admin',
        email: 'admin@nhabehealth.vn',
        phone: '0909 123 456',
        avatar: null,
      }
      const mockToken = 'mock_token_' + Date.now()

      setUser(mockUser)
      if (remember) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
        localStorage.setItem(TOKEN_KEY, mockToken)
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
        sessionStorage.setItem(TOKEN_KEY, mockToken)
      }
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message || 'Đăng nhập thất bại' }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
  }, [])

  const getInitials = (name = '') => {
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':    return 'Quản trị viên'
      case 'operator': return 'Người nhập liệu'
      case 'viewer':   return 'Người xem báo cáo'
      default:         return 'Người dùng'
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getInitials, getRoleLabel }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
