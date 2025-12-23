import React, { useState } from 'react';
import { Search, UserPlus, Edit, Trash2, Shield, Building, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '../../types';

const mockUsers: User[] = [
  { id: '1', email: 'admin@platform.com', name: '김관리자', role: 'super_admin' },
  { id: '2', email: 'company1@example.com', name: '박기업', role: 'company_admin', company: 'ABC기업' },
  { id: '3', email: 'company2@example.com', name: '이담당', role: 'company_admin', company: 'XYZ스타트업' },
  { id: '4', email: 'user1@example.com', name: '최사용자', role: 'user' },
  { id: '5', email: 'user2@example.com', name: '정회원', role: 'user' },
  { id: '6', email: 'user3@example.com', name: '강유저', role: 'user' },
];

const roleLabels = {
  super_admin: '슈퍼관리자',
  company_admin: '기업관리자',
  user: '사용자',
};

const roleColors = {
  super_admin: 'bg-red-100 text-red-800',
  company_admin: 'bg-blue-100 text-blue-800',
  user: 'bg-gray-100 text-gray-800',
};

const roleIcons = {
  super_admin: Shield,
  company_admin: Building,
  user: UserIcon,
};

export function UsersManagePage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const roleStats = {
    super_admin: users.filter(u => u.role === 'super_admin').length,
    company_admin: users.filter(u => u.role === 'company_admin').length,
    user: users.filter(u => u.role === 'user').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl mb-2">사용자 관리</h1>
          <p className="text-gray-600">플랫폼 사용자를 관리하세요 (슈퍼관리자 전용)</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-5 h-5" />
          <span>새 사용자 추가</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-1">전체 사용자</p>
          <p className="text-3xl">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-1">
            <Shield className="w-4 h-4 text-red-600" />
            <p className="text-gray-600 text-sm">슈퍼관리자</p>
          </div>
          <p className="text-3xl text-red-600">{roleStats.super_admin}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-1">
            <Building className="w-4 h-4 text-blue-600" />
            <p className="text-gray-600 text-sm">기업관리자</p>
          </div>
          <p className="text-3xl text-blue-600">{roleStats.company_admin}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-1">
            <UserIcon className="w-4 h-4 text-gray-600" />
            <p className="text-gray-600 text-sm">일반 사용자</p>
          </div>
          <p className="text-3xl text-gray-600">{roleStats.user}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="이름 또는 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체 역할</option>
            <option value="super_admin">슈퍼관리자</option>
            <option value="company_admin">기업관리자</option>
            <option value="user">사용자</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">이름</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">이메일</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">역할</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">소속</th>
                <th className="px-6 py-4 text-center text-sm text-gray-600">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const RoleIcon = roleIcons[user.role];
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center w-fit space-x-1 ${roleColors[user.role]}`}>
                        <RoleIcon className="w-3 h-3" />
                        <span>{roleLabels[user.role]}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.company || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="수정"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
