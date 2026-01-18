import localFont from "next/font/local";
import "./globals.css";

const myTamilFont = localFont({
  src: [
    {
      path: "../public/fonts/antique.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-tamil",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ta" className={myTamilFont.variable}>
      <body>{children}</body>
    </html>
  );
}
