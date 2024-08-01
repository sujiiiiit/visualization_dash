import Navbar from "@/components/Header/navbar";
import Header from "@/components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ArticleList from "@/components/Sections/ArticleList/articleList";
import Analysis from "@/components/Sections/Analysis/Main";
// import EditDialog from "@/components/Sections/ArticleList/editDialog";
function App() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 md:pl-64 pb-10">
        {/* <EditDialog /> */}

        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/analytics" element={<Analysis />} />
        </Routes>
      </main>

      <Toaster />
    </div>
  );
}

export default App;
