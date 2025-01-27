import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full mx-auto px-8 py-10 max-w-2xl md:px-0">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
