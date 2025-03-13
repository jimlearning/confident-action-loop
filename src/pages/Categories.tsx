
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { getAllCategories } from '@/utils/data';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ArrowRight, BookOpen, ChevronDown, ChevronRight, FolderTree 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryBook {
  id: string;
  title: string;
}

interface Subcategory {
  name: string;
  slug: string;
  count: number;
  color: string;
  titleColor: string;
  iconColor: string;
  description: string;
  books: CategoryBook[];
}

interface Category {
  name: string;
  slug: string;
  count: number;
  color: string;
  titleColor: string;
  iconColor: string;
  description: string;
  subcategories: Subcategory[];
}

const CategoryItem = ({ category }: { category: Category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={cn(
          "p-6 rounded-xl cursor-pointer transition-all border",
          "bg-gradient-to-br", category.color,
          isOpen ? "rounded-b-none" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderTree className={cn("w-6 h-6", category.titleColor)} />
            <h3 className={cn("text-xl font-bold", category.titleColor)}>
              {category.name} <span className="text-sm font-normal ml-2">({category.count} 本书)</span>
            </h3>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-muted/10 transition-colors"
            aria-label={isOpen ? "收起分类" : "展开分类"}
          >
            {isOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="mt-3 text-foreground/70 max-w-3xl">{category.description}</p>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="border border-t-0 border-border rounded-b-xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.slug} className="p-6 border-b last:border-b-0">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className={cn("w-5 h-5", subcategory.titleColor)} />
                  <h4 className={cn("text-lg font-semibold", subcategory.titleColor)}>
                    {subcategory.name} <span className="text-sm font-normal ml-2">({subcategory.count} 本书)</span>
                  </h4>
                </div>
                <p className="text-sm text-foreground/70 mb-3">{subcategory.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {subcategory.books.slice(0, 4).map((book) => (
                    <Link
                      key={book.id}
                      to={`/books/${book.id}`}
                      className="flex items-center p-2 rounded-lg hover:bg-muted/10 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{book.title}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Link
                    to={`/categories/${category.slug}/${subcategory.slug}`}
                    className={cn(
                      "flex items-center text-sm font-medium", 
                      subcategory.titleColor, "hover:underline"
                    )}
                  >
                    查看全部 <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const data = getAllCategories();
    setCategories(data);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      <Navbar />

      {/* Categories Header */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mt-24 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          书籍<span className="text-primary">分类</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          按照不同主题浏览书籍，探索你感兴趣的领域
        </motion.p>
      </motion.div>

      {/* Categories List with Subcategories */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {categories.map((category) => (
          <CategoryItem key={category.slug} category={category} />
        ))}
      </motion.div>

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

export default Categories;
