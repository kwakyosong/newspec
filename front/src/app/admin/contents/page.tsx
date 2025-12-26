'use client';
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { mockContents } from '@/app/data/mockData';
import { Content, ContentCategory } from '@/app/types';

export default function ContentsManagePage() {
  const [contents, setContents] = useState(mockContents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ContentCategory | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || content.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setContents(contents.filter(c => c.id !== id));
    }
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setShowAddModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl mb-2">콘텐츠 관리</h1>
          <p className="text-gray-600">공모전, 이벤트, 교육 프로그램을 관리하세요</p>
        </div>
        <button
          onClick={() => {
            setEditingContent(null);
            setShowAddModal(true);
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>새 콘텐츠 추가</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="제목으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as ContentCategory | 'all')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 카테고리</option>
              <option value="contest">공모전</option>
              <option value="event">이벤트</option>
              <option value="education">교육</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-gray-600 text-sm mb-1">전체</p>
          <p className="text-2xl">{contents.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-gray-600 text-sm mb-1">진행중</p>
          <p className="text-2xl text-green-600">
            {contents.filter(c => c.status === 'ongoing').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-gray-600 text-sm mb-1">예정</p>
          <p className="text-2xl text-blue-600">
            {contents.filter(c => c.status === 'upcoming').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-gray-600 text-sm mb-1">종료</p>
          <p className="text-2xl text-gray-600">
            {contents.filter(c => c.status === 'ended').length}
          </p>
        </div>
      </div>

      {/* Contents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">제목</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">카테고리</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">상태</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">기간</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">참가자</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">주최</th>
                <th className="px-6 py-4 text-center text-sm text-gray-600">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContents.map((content) => (
                <tr key={content.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate">{content.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {content.category === 'contest' ? '공모전' : 
                       content.category === 'event' ? '이벤트' :
                       content.category === 'education' ? '교육' : '커뮤니티'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      content.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      content.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {content.status === 'ongoing' ? '진행중' :
                       content.status === 'upcoming' ? '예정' : '종료'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {content.startDate}
                  </td>
                  <td className="px-6 py-4">
                    {content.currentParticipants}
                    {content.maxParticipants && ` / ${content.maxParticipants}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {content.organizer}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(content)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="수정"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(content.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl mb-6">
              {editingContent ? '콘텐츠 수정' : '새 콘텐츠 추가'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">제목</label>
                <input
                  type="text"
                  defaultValue={editingContent?.title}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">카테고리</label>
                <select
                  defaultValue={editingContent?.category}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="contest">공모전</option>
                  <option value="event">이벤트</option>
                  <option value="education">교육</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">설명</label>
                <textarea
                  defaultValue={editingContent?.description}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="설명을 입력하세요"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">시작일</label>
                  <input
                    type="date"
                    defaultValue={editingContent?.startDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">종료일</label>
                  <input
                    type="date"
                    defaultValue={editingContent?.endDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장 기능은 데모입니다');
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
