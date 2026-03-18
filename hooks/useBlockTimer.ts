import { useState, useEffect } from 'react';
import { Block } from '../store/blockStore';

/**
 * A simple hook to check if a block's schedule matches the current time.
 * Mock implementation: it parses "HH:MM–HH:MM" patterns.
 */
export function useBlockTimer(block: Block) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkSchedule = () => {
      if (!block.enabled) {
        setIsActive(false);
        return;
      }

      const now = new Date();
      const currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Simple regex to find time ranges like "9:00–12:00" or "20:00–22:00"
      const timeRangeRegex = /(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/;
      const match = block.schedule.match(timeRangeRegex);

      if (match) {
        const start = match[1];
        const end = match[2];

        const isWithinRange = currentTime >= start && currentTime <= end;
        setIsActive(isWithinRange);
      } else {
        // Fallback for schedules like "Every day" or other patterns
        // For now, we'll just assume they are not active if no time range is found
        setIsActive(false);
      }
    };

    checkSchedule();
    const interval = setInterval(checkSchedule, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [block.schedule, block.enabled]);

  return isActive;
}
