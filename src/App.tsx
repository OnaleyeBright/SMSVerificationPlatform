import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

import Dashboard from './pages/user/Dashboard'
import BuyNumber from './pages/user/BuyNumber'
import ActiveOrders from './pages/user/ActiveOrders'
import SMSInbox from './pages/user/SMSInbox'
import Wallet from './pages/user/Wallet'
import Transactions from './pages/user/Transactions'
import Rentals from './pages/user/Rentals'
import APIPage from './pages/user/APIPage'
import Settings from './pages/user/Settings'

import AdminOverview from './pages/admin/AdminOverview'
import AdminUsers from './pages/admin/AdminUsers'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProviders from './pages/admin/AdminProviders'
import AdminPricing from './pages/admin/AdminPricing'
import AdminSMSActivity from './pages/admin/AdminSMSActivity'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy-number" element={<BuyNumber />} />
        <Route path="/active-orders" element={<ActiveOrders />} />
        <Route path="/sms-inbox" element={<SMSInbox />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/api" element={<APIPage />} />
        <Route path="/settings" element={<Settings />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/providers" element={<AdminProviders />} />
        <Route path="/admin/pricing" element={<AdminPricing />} />
        <Route path="/admin/sms-activity" element={<AdminSMSActivity />} />

        {/* Fallback admin stubs */}
        <Route path="/admin/*" element={<AdminOverview />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
