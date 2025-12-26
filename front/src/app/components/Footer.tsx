import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">PLATFORM</h3>
            <p className="text-sm leading-relaxed">
              공모전, 이벤트, 교육 프로그램을 한 곳에서 확인하세요. 
              더 넓은 세상으로 나아가는 기회를 제공합니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contests" className="hover:text-white transition-colors">공모전</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">이벤트</Link></li>
              <li><Link href="/education" className="hover:text-white transition-colors">교육</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">커뮤니티</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/notices" className="hover:text-white transition-colors">공지사항</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">1:1 문의</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>contact@example.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>서울시 강남구 테헤란로 123</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PLATFORM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}