
import homeData from '@/resources/home.json';
import timelinesData from '@/resources/timelines.json';
import categoriesData from '@/resources/categories.json';
import tagsData from '@/resources/tags.json';

// Book data
export async function getBookData(bookId: string) {
  try {
    // Dynamic import of book data
    const bookModule = await import(`../resources/books/${bookId}.json`);
    return bookModule.default;
  } catch (error) {
    console.error(`Failed to load book data for ${bookId}:`, error);
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
