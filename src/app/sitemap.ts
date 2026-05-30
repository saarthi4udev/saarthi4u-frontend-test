import { MetadataRoute } from 'next';
import { getAllCollegeshomepage } from './api/colleges';
import { getAllBlogs } from './api/blog';
import { getAllExams } from './api/exam';
import { getAllScholarships } from './api/Scholarship';
import { getAllNews } from './api/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://saarthi4u.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about-us',
    '/careers',
    '/college',
    '/contact',
    '/course',
    '/exam',
    '/faq',
    '/help',
    '/international-colleges',
    '/news',
    '/pricing',
    '/privacy-policy',
    '/results',
    '/scholarships',
    '/services',
    '/signin',
    '/signup',
    '/terms',
    '/testimonials',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic College routes
  let collegeRoutes: any[] = [];
  try {
    const res = await getAllCollegeshomepage();
    const colleges = res?.data || [];
    if (Array.isArray(colleges)) {
      collegeRoutes = colleges.map((college: any) => ({
        url: `${baseUrl}/college/${college.slug}`,
        lastModified: new Date(college.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.warn('Sitemap builder: Failed to retrieve colleges for sitemap generation. Skipping dynamic routes.', error);
  }

  // Dynamic Blog routes
  let blogRoutes: any[] = [];
  try {
    const blogs = await getAllBlogs();
    if (Array.isArray(blogs)) {
      blogRoutes = blogs.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.warn('Sitemap builder: Failed to retrieve blogs. Skipping blog sitemap routes.', error);
  }

  // Dynamic Exam routes
  let examRoutes: any[] = [];
  try {
    const res = await getAllExams(1, 1000);
    const exams = res?.data || [];
    if (Array.isArray(exams)) {
      examRoutes = exams.map((exam: any) => ({
        url: `${baseUrl}/exam/${exam.slug}`,
        lastModified: new Date(exam.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.warn('Sitemap builder: Failed to retrieve exams. Skipping exam sitemap routes.', error);
  }

  // Dynamic Scholarship routes
  let scholarshipRoutes: any[] = [];
  try {
    const res = await getAllScholarships(1, 1000);
    const scholarships = res?.data || [];
    if (Array.isArray(scholarships)) {
      scholarshipRoutes = scholarships.map((scholarship: any) => ({
        url: `${baseUrl}/scholarships/${scholarship.slug}`,
        lastModified: new Date(scholarship.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.warn('Sitemap builder: Failed to retrieve scholarships. Skipping scholarship sitemap routes.', error);
  }

  // Dynamic News routes
  let newsRoutes: any[] = [];
  try {
    const res = await getAllNews(1, 1000);
    const news = res?.data || [];
    if (Array.isArray(news)) {
      newsRoutes = news.map((newsItem: any) => ({
        url: `${baseUrl}/news/${newsItem.slug}`,
        lastModified: new Date(newsItem.publishedOn || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.4,
      }));
    }
  } catch (error) {
    console.warn('Sitemap builder: Failed to retrieve news. Skipping news sitemap routes.', error);
  }

  return [
    ...staticRoutes,
    ...collegeRoutes,
    ...blogRoutes,
    ...examRoutes,
    ...scholarshipRoutes,
    ...newsRoutes,
  ];
}

