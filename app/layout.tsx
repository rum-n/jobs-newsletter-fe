'use client'

import StyledComponentsRegistry from './lib/registry'
import { Montserrat } from 'next/font/google'
import { Providers } from "./providers";
import Header from './components/Header';
import Footer from './components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}