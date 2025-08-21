
import "./styles/globals.scss";
import Header from "./components/Header";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import NoHoverTouch from "./components/NoHoverTouch";
import CookiesAlert from "./components/CookiesAlert";

import { Providers } from "./components/Providers";
import { FavoriteProvider } from "./context/FavoriteContext";

const dancingFont = localFont({
  src: "./fonts/DancingScript-VariableFont_wght.ttf",
  variable: "--font-dancing",
  weight: "400",
});
const loraFont = localFont({
  src: "./fonts/Lora-VariableFont_wght.ttf",
  variable: "--font-lora", // CSS változó név
  display: "swap", // Optional, for better performance
});


export const metadata = {
  title: "Kóstolj Bele! - Receptgyüjtemény!",
  description: "Receptgyűjtő alkalmazás",
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Thomas Horvath' }],
  icons: {
    icon: "/favicon.svg"
  },
};

export default function RootLayout({ children, session }) {

  return (
    <html lang="hu" className={`${loraFont.variable} ${dancingFont.variable}`}>
      <body>
        <Providers session={session}>
          <FavoriteProvider>
            <NoHoverTouch />
            <Header />
            <main className="main"> {children} </main>
            <Footer />
            <CookiesAlert />
          </FavoriteProvider>
        </Providers>
      </body>
    </html>
  );
}
