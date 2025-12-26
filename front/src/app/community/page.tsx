'use client';

import React, { useState } from 'react';
import { Search, Plus, Eye, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';
import { mockCommunityPosts } from '@/app/data/mockData';
import { useAuth } from '@/app/contexts/AuthContext';

const categories = ['전체', '정보공유', '후기', '팀원모집', '질문'];

export default function CommunityPage() {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockCommunityPosts.filter((post) => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl mb-2">커뮤니티</h1>
            <p className="text-gray-600">정보를 공유하고 소통하세요</p>
          </div>
          {isAuthenticated && (
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>글쓰기</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="게시글 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{post.author}</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.createdAt}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">게시글이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
