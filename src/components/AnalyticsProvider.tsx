'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface AnalyticsContextType {
  trackEvent: (eventName: string, eventData?: Record<string, unknown>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize analytics on first render
  useEffect(() => {
    // In a real app, you would initialize your analytics service here
    // Example: initializeGoogleAnalytics();
    console.log('Analytics initialized');
    setIsInitialized(true);
  }, []);

  // Track page views
  useEffect(() => {
    if (!isInitialized) return;
    
    // Create URL with search params
    const url = searchParams.size > 0 
      ? `${pathname}?${searchParams.toString()}` 
      : pathname;
    
    // Track page view
    console.log('Page view:', url);
    // In a real app: analytics.pageView(url);
  }, [pathname, searchParams, isInitialized]);

  // Function to track custom events
  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    if (!isInitialized) return;
    
    console.log('Event tracked:', eventName, eventData);
    // In a real app: analytics.trackEvent(eventName, eventData);
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}