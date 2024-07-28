import Header from "@/components/Header/Header";
import Navbar from "@/components/Header/navbar";
import { Toaster } from "@/components/ui/toaster";
import ArticleList from "./components/Sections/articleList";

function App() {
  return (
    <>
      <div className="flex min-h-screen">
        <Navbar />
        <main className="flex-1 sm:pl-64">
          <Header />
          <ArticleList />
        </main>

        <Toaster />
      </div>
    </>
  );
}

export default App;
