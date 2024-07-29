"use client";

import React, { useEffect, useState } from "react";
import { fetchArticles } from "@/lib/service";
import { DataType } from "@/lib/types";
import DataTableDemo from "./DatatableDemo";

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArticles(currentPage);
        setArticles(data.articles);
        setCurrentPage(data.currentPage);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [currentPage]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <DataTableDemo articles={articles} />}
    </div>
  );
};

export default ArticleList;
