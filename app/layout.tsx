
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Footer from "../components/Footer/Footer";
import { Metadata }  from "next";

// Глобальні метадані
export const metadata: Metadata = {
  title: 'NotHub - Edit Notes',
  description: 'Space for your notes',
  openGraph: {
    title: 'NoteHub - Edit Notes',
    description: 'Space for your notes',
    url: 'https://08-zustand-phi-three.vercel.app/',
   images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg']

  },
};

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});



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
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

