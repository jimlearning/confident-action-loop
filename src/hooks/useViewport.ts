import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to manage viewport settings consistently across all routes
 * @param maxScale maximum scale value for the viewport
 */
export function useViewport(maxScale = 2.0) {
  const location = useLocation();
  
  useEffect(() => {
    // Find the viewport meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    
    // Set the viewport content consistently
    viewportMeta.setAttribute(
      'content', 
      `width=device-width, initial-scale=1.0, maximum-scale=${maxScale}, user-scalable=no`
    );
    
    // Clean up function (optional)
    return () => {
      // We don't remove the meta tag on cleanup as it should persist
    };
  }, [location.pathname, maxScale]); // Re-run when route changes
}
