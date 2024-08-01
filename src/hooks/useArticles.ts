// hooks/useArticles.ts
import { useState, useEffect, useMemo } from 'react';
import { fetchArticles, deleteMultipleRecords, deleteRecordById } from '@/lib/service';
import { DataType } from '@/lib/types';

interface UseArticlesProps {
  page?: number;
  filters?: any;
}

interface UseArticlesReturn {
  articles: DataType[];
  totalPages: number;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
  error: string | null;
  deleteRecords: (ids: string[]) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

export const useArticles = ({ page = 1, filters = {}}: UseArticlesProps): UseArticlesReturn => {
  const [articles, setArticles] = useState<DataType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArticles(page, memoizedFilters);
        setArticles(data.articles);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalRecords(data.totalRecords);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, memoizedFilters]);

  const deleteRecords = async (ids: string[]) => {
    try {
      await deleteMultipleRecords(ids);
      setArticles(prev => prev.filter(article => !ids.includes(String(article._id))));
    } catch (err:any) {
      setError(err.message);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      await deleteRecordById(id);
      setArticles(prev => prev.filter(article => String(article._id) !== id));
    } catch (err:any) {
      setError(err.message);
    }
  };

  return { articles, totalPages, currentPage, totalRecords, loading, error, deleteRecords, deleteRecord };
};
