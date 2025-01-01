import Header from "@/components/Header";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Cryptocurrency Market Dashboard",
  description: "View cryptocurrency market data and details",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
