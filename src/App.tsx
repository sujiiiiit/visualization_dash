import Header from "@/components/Header/Header";
import Navbar from "@/components/Header/navbar";
import { Toaster } from "@/components/ui/toaster";
import ArticleList from "./components/Sections/ArticleList/articleList";
function App() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 md:pl-64 pb-10">
        <Header />
        <ArticleList />
      </main>

      <Toaster />
    </div>
  );
}

export default App;
