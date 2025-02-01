import './globals.css'
import { Inter } from 'next/font/google'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './css/litw-styles-2.0.0.css'

import ImportBsJS from "@/components/import-bs-js"

export const metadata = {
  title: 'ReproNLP – Evaluation of computer-generated scientific definitions',
  description: 'LabInTheWild clone to mimic the original experiment. Backend built using Next.js with Vercel KV for Redis',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ImportBsJS />
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
