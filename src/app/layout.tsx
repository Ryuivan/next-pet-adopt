import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChildrenType } from "@/types/ChildrenType";
import { Container } from "@mui/material";
import Header from "@/components/ui/header/Header";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { Bounce, ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetAdopt",
  description: "Adopt your new buddy now!",
};

export default function RootLayout({ children }: Readonly<ChildrenType>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContextProvider>
          <Header />
          <Container maxWidth="xl">{children}</Container>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            transition={Bounce}
          />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
