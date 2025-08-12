
import './(styles)/globals.css';

export const metadata = { title: 'Open Interview', description: 'Instant video evaluations' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <span className="brand">Open Interview</span>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
