import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { I18nProviderWrapper } from "@/components/providers/I18nProviderWrapper"
import { StoreProvider } from "@/components/providers/StoreProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Job Side - Chrome Extension",
  description: "Chrome sidebar assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProviderWrapper>
          <StoreProvider>
            {children}
          </StoreProvider>
        </I18nProviderWrapper>
      </body>
    </html>
  )
}
