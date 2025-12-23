import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, role);
    if (role === 'super_admin' || role === 'company_admin') {
      onNavigate('admin-dashboard');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-4"></div>
            <h1 className="text-3xl mb-2">로그인</h1>
            <p className="text-gray-600">계정에 로그인하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">역할 (테스트용)</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">사용자</option>
                <option value="company_admin">기업관리자</option>
                <option value="super_admin">슈퍼관리자</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:text-blue-700"
            >
              홈으로 돌아가기
            </button>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 mb-2">테스트용 데모 안내:</p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• 이메일과 비밀번호는 임의로 입력 가능합니다</li>
              <li>• 역할 선택으로 권한을 테스트할 수 있습니다</li>
              <li>• 슈퍼관리자: 모든 관리 기능 사용 가능</li>
              <li>• 기업관리자: 자신의 콘텐츠만 관리 가능</li>
              <li>• 사용자: 조회 및 신청만 가능</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
