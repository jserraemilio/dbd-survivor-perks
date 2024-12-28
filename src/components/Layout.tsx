import Footer from "./Footer/Footer";
import { Header } from "./Header/Header";

export default function Layout({ children }: { children: any }) {
  return (
    <div className="m-0 mx-auto min-h-screen">
      <Header />
      <main className="min-h-screen flex flex-col items-center">
        <div className="max-w-screen-xl w-full px-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
