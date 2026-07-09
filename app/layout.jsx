import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Mama's Kitchen — AI Recipe Companion",
  description: "Beautiful AI-powered recipes for every Kenyan kitchen and beyond. Built in loving memory.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <body style={{ margin: 0, padding: 0, background: "#FBF4EE" }}>
        {children}
      </body>
    </html>
  );
}