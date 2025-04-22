export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full md:w-[420px] px-6">{children}</div>
    </main>
  );
}
