
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getHomeData } from '@/utils/data';
import Hero from '@/components/home/Hero';
import PopularTags from '@/components/home/PopularTags';
import RecentBooks from '@/components/home/RecentBooks';

interface HomeData {
  header: {
    title: string;
    subtitle: string;
    description: string;
  };
  popularTags: Array<{
    name: string;
    count: number;
    color: string;
    titleColor: string;
    iconColor: string;
  }>;
}

const Home = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  
  useEffect(() => {
    try {
      const data = getHomeData();
      setHomeData(data);
    } catch (error) {
      console.error('Error loading home data:', error);
      // Set fallback data or show error state
    }
  }, []);

  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>
      
      {/* Hero Section */}
      <Hero data={homeData.header} />
      
      {/* Popular Tags Section */}
      <PopularTags tags={homeData.popularTags} />
      
      {/* Recent Books Section */}
      <RecentBooks />
      
      {/* Footer */}
      <motion.footer
        className="w-full py-8 text-center text-muted-foreground text-sm border-t border-border mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} 读书笔记 Cheat Sheets. 保留所有权利。</p>
          <p className="mt-2">设计灵感来源于极简主义设计原则</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
