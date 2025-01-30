import './globals.css'
import './css/bootstrap.min-5_3_0.css'
import './css/bootstrap-icons-1.11.3.css'
import './css/alpaca.min-1.5.23.css'
// import './css/shareon.min-2.5.0.css'
import './css/litw-styles-2.0.0.css'
import { Inter } from 'next/font/google'

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
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
