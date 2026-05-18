import './globals.css'

export const metadata = {
  title: 'Figurinhas Copa 2026',
  description: 'Rastreador compartilhado de figurinhas da Copa do Mundo 2026',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
