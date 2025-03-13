
import categoriesData from '@/resources/categories.json';
import homeData from '@/resources/home.json';
import tagsData from '@/resources/tags.json';
import timelinesData from '@/resources/timelines.json';

import { BookContentSchema } from '@/schemas/bookSchema';

// 检查书籍文件是否存在
async function checkBookExists(bookId: string) {
  try {
    const fullPath = new URL(
      `../resources/books/${bookId}.json`,
      import.meta.url
    ).pathname;
    await import(/* @vite-ignore */ fullPath);
    return true;
  } catch {
    return false;
  }
}

// Book data
export async function getBookData(bookId: string) {
  const startTime = Date.now();
  try {
    console.log(`[getBookData] 开始加载书籍 ${bookId}`);
    
    if (!bookId) {
      console.error('[getBookData] Book ID is required');
      return null;
    }

    // 检查文件是否存在
    console.log(`[getBookData] 检查书籍 ${bookId} 文件是否存在...`);
    const exists = await checkBookExists(bookId);
    if (!exists) {
      console.error(`[getBookData] 书籍 ${bookId} JSON文件不存在`);
      return null;
    }
    console.log(`[getBookData] 书籍 ${bookId} 文件存在，开始加载数据...`);

    // Dynamic import of book data with retry
    let bookModule = null;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelays = [1000, 2000, 3000]; // 递增的重试间隔

    while (retryCount < maxRetries) {
      try {
        console.log(`[getBookData] 尝试加载书籍 ${bookId}，第 ${retryCount + 1} 次尝试`);
        bookModule = await import(
          /* @vite-ignore */
          new URL(
            `../resources/books/${bookId}.json`,
            import.meta.url
          ).pathname
        );
        console.log(`[getBookData] 书籍 ${bookId} 模块加载成功，检查数据...`);
        
        if (bookModule?.default) {
          console.log(`[getBookData] 书籍 ${bookId} 数据存在，继续处理`);
          break;
        } else {
          console.warn(`[getBookData] 书籍 ${bookId} 模块存在但数据为空，将重试`);
          throw new Error('数据为空');
        }
      } catch (error) {
        retryCount++;
        console.error(`[getBookData] 加载书籍 ${bookId} 失败，第 ${retryCount} 次尝试:`, error);
        
        if (retryCount === maxRetries) {
          console.error(`[getBookData] 书籍 ${bookId} 已达到最大重试次数，放弃加载`);
          return null;
        }
        
        const delay = retryDelays[retryCount - 1];
        console.log(`[getBookData] 等待 ${delay}ms 后进行第 ${retryCount + 1} 次尝试`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (!bookModule?.default) {
      console.error(`[getBookData] 书籍 ${bookId} 最终数据仍然为空`);
      return null;
    }

    // 深度克隆避免数据污染
    console.log(`[getBookData] 克隆书籍 ${bookId} 数据...`);
    const bookData = structuredClone(bookModule.default);
    console.log(`[getBookData] 书籍 ${bookId} 数据结构:`, {
      hasId: !!bookData.id,
      hasTitle: !!bookData.title,
      hasContent: !!bookData.content,
      contentKeys: bookData.content ? Object.keys(bookData.content) : []
    });

    // 基础字段验证
    console.log(`[getBookData] 验证书籍 ${bookId} 基础字段...`);
    const requiredFields = ['id', 'title', 'description', 'category', 'tags', 'rating'] as const;
    const missingFields = requiredFields.filter(field => !(field in bookData));

    if (missingFields.length > 0) {
      console.error(`[getBookData] 书籍 ${bookId} 缺少必需字段:`, missingFields);
      return null;
    }

    // 类型验证
    console.log(`[getBookData] 验证书籍 ${bookId} 字段类型...`);
    const typeValidation = {
      id: typeof bookData.id === 'string',
      title: typeof bookData.title === 'string',
      description: typeof bookData.description === 'string',
      category: typeof bookData.category === 'string',
      tags: Array.isArray(bookData.tags),
      rating: typeof bookData.rating === 'number'
    };

    const invalidTypes = Object.entries(typeValidation)
      .filter(([_, valid]) => !valid)
      .map(([field]) => field);

    if (invalidTypes.length > 0) {
      console.error(`[getBookData] 书籍 ${bookId} 字段类型错误:`, invalidTypes);
      return null;
    }

    // Content Schema 验证
    console.log(`[getBookData] 验证书籍 ${bookId} 内容结构...`);
    if (!bookData.content) {
      console.error(`[getBookData] 书籍 ${bookId} 缺少content字段`);
      return null;
    }

    // 打印content结构以便调试
    console.log(`[getBookData] 书籍 ${bookId} content结构:`, {
      misconception: bookData.content.misconception ? Object.keys(bookData.content.misconception) : null,
      reality: bookData.content.reality ? Object.keys(bookData.content.reality) : null,
      sections: bookData.content.sections ? bookData.content.sections.length : 0,
      keyPoints: bookData.content.keyPoints ? bookData.content.keyPoints.length : 0
    });

    const contentValidation = BookContentSchema.safeParse(bookData.content);
    if (!contentValidation.success) {
      console.error(`[getBookData] 书籍 ${bookId} content验证失败:`, 
        contentValidation.error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        })));
      return null;
    }

    // 打印schema验证后的数据结构
    console.log(`[getBookData] 书籍 ${bookId} schema验证通过，最终数据结构:`, {
      misconception: contentValidation.data.misconception ? Object.keys(contentValidation.data.misconception) : null,
      reality: contentValidation.data.reality ? Object.keys(contentValidation.data.reality) : null,
      sections: contentValidation.data.sections ? contentValidation.data.sections.length : 0,
      keyPoints: contentValidation.data.keyPoints ? contentValidation.data.keyPoints.length : 0
    });

    const endTime = Date.now();
    console.log(`[getBookData] 书籍 ${bookId} 加载成功，耗时 ${endTime - startTime}ms`);
    return bookData;
  } catch (error) {
    const endTime = Date.now();
    console.error(`[getBookData] 加载书籍 ${bookId} 时发生错误 (耗时 ${endTime - startTime}ms):`, error);
    return null;
  }
}

// Home page data
export function getHomeData() {
  return homeData;
}

// Timeline data
export function getTimelineData() {
  return timelinesData;
}

// Get all categories
export function getAllCategories() {
  return categoriesData.categories;
}

// Get category by slug
export function getCategoryBySlug(slug: string) {
  return categoriesData.categories.find(category => category.slug === slug);
}

// Get subcategory by parent slug and subcategory slug
export function getSubcategoryBySlug(parentSlug: string, subcategorySlug: string) {
  const parent = getCategoryBySlug(parentSlug);
  if (!parent || !parent.subcategories) return null;

  return parent.subcategories.find(subcategory => subcategory.slug === subcategorySlug);
}

// Get all tags
export function getAllTags() {
  return tagsData.tags;
}

// Get tag by name
export function getTagByName(name: string) {
  return tagsData.tags.find(tag => tag.name === name);
}

// Get related books for a book
export async function getRelatedBooks(bookId: string, tags: string[], limit = 3) {
  try {
    const relatedBooksPromises = [];

    // First try to get books with the same tags
    for (const tag of tags) {
      const tagData = getTagByName(tag);
      if (tagData && tagData.books) {
        for (const tagBook of tagData.books) {
          if (tagBook.id !== bookId) {
            relatedBooksPromises.push(getBookData(tagBook.id));
          }
        }
      }
    }

    const relatedBooks = await Promise.all(relatedBooksPromises);

    // Filter out nulls and duplicates
    const uniqueBooks = relatedBooks
      .filter(book => book !== null)
      .filter((book, index, self) =>
        index === self.findIndex(b => b.id === book.id)
      );

    return uniqueBooks.slice(0, limit);
  } catch (error) {
    console.error('Error fetching related books:', error);
    return [];
  }
}
