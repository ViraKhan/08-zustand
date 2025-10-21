
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Footer from "../components/Footer/Footer";
import { Metadata }  from "next";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; 
// Глобальні метадані
export const metadata: Metadata = {
  title: 'NotHub - Edit Notes',
  description: 'Space for your notes',
  openGraph: {
    title: 'NoteHub - Edit Notes',
    description: 'Space for your notes',
    url: siteUrl,
   images: [
    {
    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
    width: 1200,      
    height: 630,     
    alt: 'NoteHub', 
  },
],

  },
};





export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main style={{ flex: 1 }}> 
            {children} 
          </main>
            {modal}
         
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

