"use client";
import Header from "@/components/Header";
import "./globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
