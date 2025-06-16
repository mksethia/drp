// app/layout.tsx
import "./globals.css";
import Header from "./Header";
import Providers from "./providers";
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: "NEXTPLAY",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          bg-[url('/images/background.jpg')]
          bg-cover
          bg-center
          min-h-screen
          flex
          flex-col
        "
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
