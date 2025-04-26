export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="inline-block  text-center justify-center">
      {children}
    </section>
  );
}
