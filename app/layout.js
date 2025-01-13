
import { Button } from "@/components/ui/button";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-event";



export const metadata = {
  title: "Calendix",
  description: "Calendly clone",
};



export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <Header/>
        <main className="min-h-screen bg-gradient-to-b from -blue-50 to-white">
        {/* <Button>Submit</Button> */}
        {children}
        </main>
        <footer className="bg-blue-100 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600"> 
            <p>
            Made with ❤️ by Chase
            </p>
            </div>
        </footer>
        <CreateEventDrawer/>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
