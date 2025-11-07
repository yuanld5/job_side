import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { I18nProviderWrapper } from "@/components/providers/I18nProviderWrapper"
import { StoreProvider } from "@/components/providers/StoreProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Job Side - Chrome Extension",
    template: "%s | Job Side",
  },
  description: "Chrome sidebar assistant - 通过自然语言指令控制网页操作",
  keywords: ["Chrome Extension", "网页操作", "AI助手", "Next.js"],
  authors: [{ name: "Job Side Team" }],
  creator: "Job Side",
  publisher: "Job Side",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    title: "Job Side - Chrome Extension",
    description: "Chrome sidebar assistant - 通过自然语言指令控制网页操作",
    siteName: "Job Side",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Side - Chrome Extension",
    description: "Chrome sidebar assistant - 通过自然语言指令控制网页操作",
    creator: "@jobside",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProviderWrapper>
          <StoreProvider>
            {children}
            {modal}
          </StoreProvider>
        </I18nProviderWrapper>
      </body>
    </html>
  )
}
