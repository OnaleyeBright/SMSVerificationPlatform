import { useState } from 'react'
import { Search, Filter, MoreHorizontal, UserCheck, UserX } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', balance: '$42.50', orders: 84, status: 'active', joined: 'Jan 12, 2024' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', balance: '$12.00', orders: 31, status: 'active', joined: 'Feb 3, 2024' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', balance: '$0.00', orders: 5, status: 'suspended', joined: 'Mar 18, 2024' },
  { id: 4, name: 'Dave Brown', email: 'dave@example.com', balance: '$125.50', orders: 212, status: 'active', joined: 'Nov 30, 2023' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', balance: '$8.25', orders: 17, status: 'active', joined: 'Apr 7, 2024' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', balance: '$55.00', orders: 98, status: 'active', joined: 'Dec 1, 2023' },
  { id: 7, name: 'Grace Wilson', email: 'grace@example.com', balance: '$0.00', orders: 2, status: 'suspended', joined: 'Jul 20, 2024' },
]

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [actionMenu, setActionMenu] = useState<number | null>(null)

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search)
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <AdminLayout title="Users">
      <div className="space-y-4 animate-fade-in">
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search users..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
          </div>
          <div className="flex gap-1">
            {['all', 'active', 'suspended'].map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === f ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {f}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={12} /> Filters
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['User', 'Email', 'Wallet Balance', 'Orders', 'Status', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {u.name[0]}
                        </div>
                        <span className="text-sm font-medium text-[#0F172A]">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{u.email}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#0F172A]">{u.balance}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{u.orders}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{u.joined}</td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button onClick={() => setActionMenu(actionMenu === u.id ? null : u.id)}
                          className="p-1 rounded hover:bg-slate-100 text-slate-400">
                          <MoreHorizontal size={15} />
                        </button>
                        {actionMenu === u.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                            <button className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              View profile
                            </button>
                            {u.status === 'active' ? (
                              <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <UserX size={12} /> Suspend
                              </button>
                            ) : (
                              <button className="w-full text-left px-3 py-1.5 text-xs text-green-600 hover:bg-green-50 flex items-center gap-2">
                                <UserCheck size={12} /> Activate
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
