
import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

export function useTheme() {
  // 检查本地存储中是否有主题设置，如果没有则使用系统偏好
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme') as Theme | null;
      
      if (storedTheme) {
        return storedTheme;
      }
      
      // 默认使用系统偏好
      return 'system';
    }
    
    // 默认使用深色模式
    return 'dark';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // 当主题变化时，更新文档根元素的类和本地存储
  useEffect(() => {
    const root = window.document.documentElement;
    
    // 移除旧主题类
    root.classList.remove('light', 'dark');
    
    // 如果是系统主题，检查系统偏好
    let actualTheme = theme;
    if (theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // 添加新主题类
    root.classList.add(actualTheme);
    
    // 保存到本地存储
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 监听系统偏好变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.add(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, setTheme };
}
