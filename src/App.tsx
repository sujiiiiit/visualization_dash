import Header from "@/components/Header/Header";
import Navbar from "@/components/Header/navbar";
import { Toaster } from "@/components/ui/toaster";
import ArticleList from "./components/Sections/ArticleList/articleList";
import { ScrollArea } from "@/components/ui/scroll-area"
function App() {
  return (
    <ScrollArea className="h-dvh">
      <div className="flex min-h-screen">
        <Navbar />
        <main className="flex-1 sm:pl-64">
          <Header />
          <div className="sm:p-4 p-2">
            <ArticleList />
          </div>
        </main>

        <Toaster />
      </div>
    </ScrollArea>
  );
}

export default App;
