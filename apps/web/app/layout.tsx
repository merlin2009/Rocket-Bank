export const metadata = { title: 'Rocket Bank' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif', margin: 0 }}>
        <nav style={{ padding: 12, borderBottom: '1px solid #eee' }}>
          <strong>Rocket Bank</strong>
          <a href="/" style={{ marginLeft: 12, marginRight: 12 }}>Dashboard</a>
          <a href="/accounts" style={{ marginRight: 12 }}>Accounts</a>
          <a href="/payments" style={{ marginRight: 12 }}>Payments</a>
          <a href="/defi" style={{ marginRight: 12 }}>DeFi</a>
          <a href="/ai" style={{ marginRight: 12 }}>AI</a>
        </nav>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}

