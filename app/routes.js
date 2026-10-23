import { index, layout, route } from '@react-router/dev/routes'

export default [
  route('login', '../src/pages/Login/Login.jsx'),
  layout('../src/components/Layout/AdminLayout.jsx', [
    index('../src/pages/Dashboard/Dashboard.jsx'),
    route('ho-so-ksk', '../src/pages/HoSoKSK/HoSoKSK.jsx'),
    route('ho-so-ksk/tao-moi', '../src/pages/HoSoKSK/TaoHoSo.jsx'),
    route('nhap-du-lieu', '../src/pages/NhapDuLieu/NhapDuLieu.jsx'),
    route('xuat-du-lieu', '../src/pages/XuatDuLieu/XuatDuLieu.jsx'),
    route('nhap-du-lieu-api', '../src/pages/NhapDuLieuAPI/NhapDuLieuAPI.jsx'),
    route('cai-dat', '../src/pages/CaiDat/CaiDat.jsx'),
  ]),
]
