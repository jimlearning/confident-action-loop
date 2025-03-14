
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { getCategoryBySlug, getSubcategoryBySlug, getBookData } from '@/utils/data';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, FolderTree, Star, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '@/components/RatingStars';

const CategoryDetail = () => {
  const { categorySlug, subcategorySlug } = useParams<{ 
    categorySlug: string; 
    subcategorySlug?: string;
  }>();
  
  const [category, setCategory] = useState<any>(null);
  const [subcategory, setSubcategory] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;
      
      const categoryData = getCategoryBySlug(categorySlug);
      setCategory(categoryData);
      
      if (subcategorySlug) {
        const subcategoryData = getSubcategoryBySlug(categorySlug, subcategorySlug);
        setSubcategory(subcategoryData);
        
        if (subcategoryData?.books) {
          const bookPromises = subcategoryData.books.map((book: { id: string }) => 
            getBookData(book.id)
          );
          
          const bookData = await Promise.all(bookPromises);
          setBooks(bookData.filter(Boolean));
        }
      } else if (categoryData?.subcategories) {
        // If no subcategory is specified, load books from all subcategories
        const allBookIds: {[key: string]: boolean} = {};
        
        categoryData.subcategories.forEach((sub: any) => {
          sub.books?.forEach((book: { id: string }) => {
            allBookIds[book.id] = true;
          });
        });
        
        const bookPromises = Object.keys(allBookIds).map(id => getBookData(id));
        const bookData = await Promise.all(bookPromises);
        setBooks(bookData.filter(Boolean));
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [categorySlug, subcategorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="mt-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="text-center mt-24">
          <h1 className="text-3xl font-bold mb-4">分类未找到</h1>
          <p className="mb-6 text-muted-foreground">抱歉，我们找不到您请求的分类</p>
          <Link to="/categories" className="text-primary flex items-center justify-center hover:underline">
            <ArrowLeft className="mr-2 w-4 h-4" /> 返回分类列表
          </Link>
        </div>
      </div>
    );
  }

  const displayedCategory = subcategory || category;
  const breadcrumbs = [
    { name: '分类', path: '/categories' },
    { name: category.name, path: `/categories/${categorySlug}` },
    ...(subcategory ? [{ name: subcategory.name, path: `/categories/${categorySlug}/${subcategorySlug}` }] : [])
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      {/* Category Header */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mt-24 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumbs */}
        <nav className="flex items-center mb-6 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-foreground">{crumb.name}</span>
              ) : (
                <Link to={crumb.path} className="hover:text-foreground">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        
        <motion.div 
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={cn(
            "p-4 rounded-xl bg-gradient-to-br",
            displayedCategory.color
          )}>
            <FolderTree className={cn("w-8 h-8", displayedCategory.titleColor)} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {displayedCategory.name} <span className="text-muted-foreground">({displayedCategory.count})</span>
            </h1>
            <p className="text-muted-foreground mt-1">{displayedCategory.description}</p>
          </div>
        </motion.div>

        <motion.div
          className="h-1 w-full bg-gradient-to-r from-transparent via-border to-transparent mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </motion.div>

      {/* Subcategories List (if we're at the top level) */}
      {!subcategorySlug && category.subcategories && (
        <motion.div
          className="w-full max-w-7xl px-4 md:px-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">子分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subcategories.map((sub: any, index: number) => (
              <motion.div
                key={sub.slug}
                className={cn(
                  "p-6 rounded-xl border transition-all",
                  "bg-gradient-to-br hover:shadow-lg", sub.color
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.7, duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className={cn("w-5 h-5", sub.titleColor)} />
                  <h3 className={cn("text-lg font-semibold", sub.titleColor)}>
                    {sub.name} <span className="text-sm font-normal">({sub.count})</span>
                  </h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">{sub.description}</p>
                <Link
                  to={`/categories/${categorySlug}/${sub.slug}`}
                  className={cn(
                    "flex items-center text-sm font-medium", 
                    sub.titleColor, "hover:underline mt-auto"
                  )}
                >
                  查看分类 <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Books Grid */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: subcategorySlug ? 0.6 : 0.8, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">书籍列表</h2>
        {books.length > 0 ? (
          <BentoGrid>
            {books.map((book, index) => (
              <BentoItem
                key={book.id}
                title={book.title}
                titleColor={book.titleColor}
                className={`md:col-span-3 bg-gradient-to-br ${book.coverColor}`}
                icon={<BookOpen className={`w-5 h-5 ${book.iconColor}`} />}
                delay={index + 1}
              >
                <div className="space-y-4 mt-2">
                  <p>{book.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        to={`/tags/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <RatingStars rating={book.rating} />

                    <Link
                      to={`/books/${book.id}`}
                      className="flex items-center text-primary hover:underline"
                    >
                      查看详情 <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </BentoItem>
            ))}
          </BentoGrid>
        ) : (
          <div className="text-center py-16 bg-muted/5 rounded-xl border border-border">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">暂无书籍</h3>
            <p className="text-muted-foreground">这个分类下暂时还没有书籍</p>
          </div>
        )}
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

export default CategoryDetail;
