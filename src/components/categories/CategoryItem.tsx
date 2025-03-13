
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, BookOpen, ChevronDown, ChevronRight, FolderTree } from 'lucide-react';
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

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
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

export default CategoryItem;
