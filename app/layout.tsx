import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "@/components/ReactQueryProvider";
// import { ThemeProvider } from "@/components/providers/RootProviders"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purrse",
  description: "catty finance buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className="dark" style={{colorScheme:"dark",}}>
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          > */}

         <ReactQueryProvider>

          {children}

        </ReactQueryProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
