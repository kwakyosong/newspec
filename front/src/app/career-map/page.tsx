'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  User, 
  Map, 
  Share2, 
  Smile, 
  Meh, 
  Frown,
  ArrowDown
} from 'lucide-react';
import { mockCareerJourneys } from '@/app/data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

export default function CareerMapPage() {
  const { survivor, dropout } = mockCareerJourneys;

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'positive': return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative': return <Frown className="w-5 h-5 text-red-500" />;
      default: return <Meh className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Survivor & Dropout Map</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              비슷한 조건에서 시작했지만 서로 다른 결말을 맞이한 사람들의 이야기.<br />
              성공과 실패의 갈림길을 통해 나의 커리어 여정을 설계해보세요.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => document.getElementById('comparison-view')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Map className="mr-2 w-5 h-5" />
                여정 살펴보기
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Comparison View */}
      <div id="comparison-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Survivor Profile */}
          <Card className="border-t-4 border-t-green-500 shadow-lg bg-green-50/30">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 mb-1">
                    {survivor.outcome.toUpperCase()}
                  </Badge>
                  <CardTitle className="text-2xl">{survivor.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-base">
                "{survivor.description}"
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Dropout Profile */}
          <Card className="border-t-4 border-t-gray-400 shadow-lg bg-gray-50/30">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-gray-200 rounded-full">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <Badge variant="secondary" className="bg-gray-200 text-gray-800 hover:bg-gray-200 mb-1">
                    {dropout.outcome.toUpperCase()}
                  </Badge>
                  <CardTitle className="text-2xl">{dropout.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-base">
                "{dropout.description}"
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Timeline Comparison */}
        <div className="relative">
          {/* Central Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0" />

          <div className="space-y-12">
            {survivor.steps.map((stepA, index) => {
              const stepB = dropout.steps[index];
              return (
                <div key={stepA.stepId} className="relative z-10">
                  {/* Phase Label */}
                  <div className="flex justify-center mb-6">
                    <span className="bg-slate-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Phase {stepA.stepId}: {stepA.date}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Left: Survivor Step */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-green-200 hover:border-green-400 transition-all cursor-pointer hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-green-800">{stepA.title}</h3>
                            {getEmotionIcon(stepA.emotion)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{stepA.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Right: Dropout Step */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-gray-200 hover:border-gray-400 transition-all cursor-pointer hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-gray-700">{stepB.title}</h3>
                            {getEmotionIcon(stepB.emotion)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{stepB.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Mobile Arrow */}
                  <div className="md:hidden flex justify-center py-4 text-gray-300">
                    <ArrowDown className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conclusion */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
              <span className="font-medium mr-4">성공 요인:</span>
              <span className="text-gray-600 mr-8">동료와의 피드백, 실전 프로젝트 경험</span>
              
              <div className="h-4 w-px bg-gray-300 mr-8 hidden md:block"></div>
              
              <XCircle className="w-6 h-6 text-red-500 mr-2" />
              <span className="font-medium mr-4">실패 요인:</span>
              <span className="text-gray-600">고립된 학습, 피드백 부재</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Call to Action */}
      <section className="bg-blue-50 py-16 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">여러분의 이야기도 들려주세요</h2>
            <p className="text-gray-600 mb-8">
              성공담뿐만 아니라, 실패와 극복의 과정도 누군가에게는 큰 배움이 됩니다.<br />
              나의 커리어 전환 지도를 익명으로 공유하고, 서로를 응원해주세요.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 w-full"
              >
                <Share2 className="mr-2 w-5 h-5" />
                나의 여정 공유하기
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full bg-white hover:bg-gray-50"
              >
                다른 사례 더보기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
