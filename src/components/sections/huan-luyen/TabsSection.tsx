'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import * as Tabs from '@radix-ui/react-tabs';
import LongTermProgramsSection from './LongTermProgramsSection';
import CoursesSection from './CoursesSection';
import UpcomingScheduleSection from '@/components/sections/huan-luyen/UpcomingScheduleSection';
export default function TabsSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get tab from URL, default to 'programs'
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam === 'topical' ? 'topical' : 'programs';
  const [activeTab, setActiveTab] = useState<'programs' | 'topical'>(initialTab);
  
  // Track loaded tabs to prevent re-fetching
  const loadedTabsRef = useRef<Set<string>>(new Set([initialTab]));
  
  // Sync with URL on mount and when URL changes
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    const newTab = tabFromUrl === 'topical' ? 'topical' : 'programs';
    setActiveTab(newTab);
    loadedTabsRef.current.add(newTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  
  // Update URL when tab changes
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as 'programs' | 'topical');
    loadedTabsRef.current.add(value);
    
    // Update URL without scrolling
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'topical') {
      params.set('tab', 'topical');
    } else {
      params.delete('tab');
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return (
<>
      <Tabs.Root
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        {/* Tabs List - positioned to overlap between Hero and Content */}
        <div className="relative z-10 bg-primary">
          <div className="container mx-auto">
            <Tabs.List
              className="inline-flex items-center justify-center rounded-lg p-1 bg-white/10 border border-white/20 backdrop-blur-sm"
              aria-label="Chọn loại khóa học"
            >
              <Tabs.Trigger
                value="programs"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-serif font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white/70 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm hover:text-white hover:bg-white/10 data-[state=active]:hover:bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                  <path d="M22 10v6"></path>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                </svg>
                Chương trình huấn luyện
              </Tabs.Trigger>
              
              <Tabs.Trigger
                value="topical"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-serif font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white/70 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm hover:text-white hover:bg-white/10 data-[state=active]:hover:bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M12 7v14"></path>
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                </svg>
                Khóa học chuyên đề
              </Tabs.Trigger>
            </Tabs.List>
          </div>
        </div>
  
        {/* Tab Content */}
        <Tabs.Content
          value="programs"
          className="w-full focus-visible:outline-none"
        >
          {loadedTabsRef.current.has('programs') && <LongTermProgramsSection />}
        <UpcomingScheduleSection />
        </Tabs.Content>
        
        <Tabs.Content
          value="topical"
          className="w-full focus-visible:outline-none"
        >
          {loadedTabsRef.current.has('topical') && <CoursesSection />}
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
