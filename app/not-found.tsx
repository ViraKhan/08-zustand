import css from './page.module.css';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
   openGraph: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: `${siteUrl}/not-found`,
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg']

  },
};
function NotFound() {

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound