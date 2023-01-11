export default function HiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body style={{ border: "1rem solid pink" }}>{children}</body>
    </html>
  );
}
