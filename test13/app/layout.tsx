export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body style={{ border: "1rem solid skyblue" }}>{children}</body>
    </html>
  );
}
