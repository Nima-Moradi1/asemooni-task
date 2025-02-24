import type { Metadata } from "next";
import "./globals.css";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import QueryClientProvider from "@/providers/QueryClientProvider";
import vazirFont from "@/constants/localFont";
import ThemeProviderWrapper from "@/providers/ThemeProviderWrapper";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "آسمونی",
  description: "وب اپلیکیشن آزمایشی آسمونی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${vazirFont.variable} font-sans antialiased`}
      >
        <QueryClientProvider>
          <Toaster/>
          <ThemeProviderWrapper>
            <Header/>
          <MaxWidthWrapper>
        {children}
        </MaxWidthWrapper>
          </ThemeProviderWrapper>
        </QueryClientProvider>
        
        
      </body>
    </html>
  );
}
