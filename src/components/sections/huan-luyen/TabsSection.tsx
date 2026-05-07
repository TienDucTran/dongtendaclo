'use client';

import { useState } from 'react';
import LongTermProgramsSection from './LongTermProgramsSection';
import CoursesSection from './CoursesSection';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'programs',
    label: 'Chương trình huấn luyện',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap mr-2 h-4 w-4" aria-hidden="true">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
        <path d="M22 10v6"></path>
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
      </svg>
    ),
  },
  {
    id: 'courses',
    label: 'Khóa học chuyên đề',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open mr-2 h-4 w-4" aria-hidden="true">
        <path d="M12 7v14"></path>
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
  },
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState('programs');

  return (
    <>
      {/* Tabs */}
      <div className="px-4 lg:px-8 -mb-px">
        <div className="container mx-auto">
          <div 
            role="tablist" 
            aria-orientation="horizontal" 
            className="h-9 items-center justify-center rounded-lg text-muted-foreground grid w-full max-w-2xl grid-cols-2 gap-2 bg-transparent p-0"
            tabIndex={0}
            data-orientation="horizontal"
            style={{ outline: 'none' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`radix-content-${tab.id}`}
                data-state={activeTab === tab.id ? 'active' : 'inactive'}
                id={`radix-trigger-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                tabIndex={activeTab === tab.id ? 0 : -1}
                data-orientation="horizontal"
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-t-2xl rounded-b-none border border-b-0 border-primary-foreground/20 bg-primary-foreground/10 py-3 text-primary-foreground/80 ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-none data-[state=active]:bg-background data-[state=active]:text-foreground'
                    : ''
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div 
        dir="ltr" 
        data-orientation="horizontal" 
        className="w-full"
      >
        <div
          data-state={activeTab === 'programs' ? 'active' : 'inactive'}
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="radix-trigger-programs"
          id="radix-content-programs"
          tabIndex={0}
          className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
          hidden={activeTab !== 'programs'}
        >
          {activeTab === 'programs' && <LongTermProgramsSection />}
        </div>
        <div
          data-state={activeTab === 'courses' ? 'active' : 'inactive'}
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="radix-trigger-courses"
          id="radix-content-courses"
          tabIndex={0}
          className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
          hidden={activeTab !== 'courses'}
        >
          {activeTab === 'courses' && <CoursesSection />}
        </div>
      </div>
    </>
  );
}