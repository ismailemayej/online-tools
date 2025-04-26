export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inline-block text-center justify-center">{children}</div>
  );
}
