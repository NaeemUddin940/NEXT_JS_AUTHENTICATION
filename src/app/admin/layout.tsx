export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ background: "#eee", padding: "1rem" }}>
          Admin Dashboard Header
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
