import React, { useState } from 'react';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminPage = currentPage.startsWith('admin');

  const userNavItems = [
    { id: 'home', label: '홈' },
    { id: 'community', label: '커뮤니티' },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', label: '대시보드' },
    { id: 'admin-contents', label: '콘텐츠 관리' },
    ...(user?.role === 'super_admin'
      ? [{ id: 'admin-users', label: '사용자 관리' }]
      : []),
  ];

  const navItems = isAdminPage ? adminNavItems : userNavItems;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate(isAuthenticated && (user?.role === 'super_admin' || user?.role === 'company_admin') ? 'admin-dashboard' : 'home')}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-xl">PLATFORM</span>
            </button>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 사용자 메뉴 */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {user?.role === 'super_admin'
                      ? '슈퍼관리자'
                      : user?.role === 'company_admin'
                      ? '기업관리자'
                      : '사용자'}
                  </span>
                </div>
                {(user?.role === 'super_admin' || user?.role === 'company_admin') && !isAdminPage && (
                  <button
                    onClick={() => onNavigate('admin-dashboard')}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>관리자</span>
                  </button>
                )}
                {isAdminPage && (
                  <button
                    onClick={() => onNavigate('home')}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    사용자 페이지
                  </button>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                로그인
              </button>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-600">
                  {user?.name} ({user?.role === 'super_admin' ? '슈퍼관리자' : user?.role === 'company_admin' ? '기업관리자' : '사용자'})
                </div>
                {(user?.role === 'super_admin' || user?.role === 'company_admin') && !isAdminPage && (
                  <button
                    onClick={() => {
                      onNavigate('admin-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    관리자 페이지
                  </button>
                )}
                {isAdminPage && (
                  <button
                    onClick={() => {
                      onNavigate('home');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    사용자 페이지
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
