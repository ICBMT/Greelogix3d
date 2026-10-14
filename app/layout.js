import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

export const metadata = {
  title: "GreeLogix — AI Software & MVPs That Actually Ship",
  description: "Senior software agency building AI products, custom web & mobile apps and investor-ready MVPs in 4–8 weeks. 150+ products shipped for US, UK, UAE, AU & CA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  );
}
