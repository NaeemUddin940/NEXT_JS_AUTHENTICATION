export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ background: "#eee", padding: "1rem" }}>
          User Header
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
