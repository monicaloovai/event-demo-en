export const metadata = {
  title: "Event Experience – Cubiqo × MonicaLoov.ai",
  description:
    "A digital event experience right in your phone. Digital Experience powered by MonicaLoov.ai.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a10",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
