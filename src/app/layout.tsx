import "@/styles/globals.css";
import { type Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "./_components/ThemeProvider";
import { AppLayout } from "./_components/AppLayout";
import { OverlayProvider } from "@/contexts/OverlayContext";


// Metadata remains a server-side export
export const metadata: Metadata = {
  title: "ThatChatThang",
  description: "A new chat application",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',

	weight: ['300', '400', '500', '600', '700'],
})


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} font-sans`}>
        <TRPCReactProvider>
          <ThemeProvider>
            <OverlayProvider>
            <SessionProvider>
              <AppLayout>{children}</AppLayout>
            </SessionProvider>
            </OverlayProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
