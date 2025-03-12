import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export function useTheme() {
  // 检查本地存储中是否有主题设置，如果没有则使用系统偏好
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme') as Theme | null;
      
      if (storedTheme) {
        return storedTheme;
      }
      
      // 检查系统偏好
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
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
    // 添加新主题类
    root.classList.add(theme);
    
    // 保存到本地存储
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}