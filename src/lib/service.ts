// service.ts
import axios from "axios";
import { DataType } from "./types";

// const API_URL = "http://localhost:5000/api";
const API_URL =  "https://blackcofferapi.vercel.app/api";

export const fetchArticles = async (
  page: number = 1,
  filters: any = {}
): Promise<{ articles: DataType[]; totalPages: number; currentPage: number; totalRecords: number; }> => {
  try {
    const response = await axios.get<{ articles: DataType[]; totalPages: number; currentPage: number; totalRecords: number; }>(
      `${API_URL}/search`,
      {
        params: {
          page,
          ...filters
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Fetch articles error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Fetch articles error:", error);
    }
    throw new Error("Failed to fetch articles. Please try again.");
  }
};

// Add the delete multiple records service
export const deleteMultipleRecords = async (ids: string[]): Promise<{ message: string; }> => {
  try {
    const response = await axios.delete<{ message: string; }>(`${API_URL}/search/multiple`, {
      data: { ids }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Delete multiple records error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Delete multiple records error:", error);
    }
    throw new Error("Failed to delete records. Please try again.");
  }
};

// Add the delete single record service
export const deleteRecordById = async (id: string): Promise<{ message: string; }> => {
  try {
    const response = await axios.delete<{ message: string; }>(`${API_URL}/search/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Delete record error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Delete record error:", error);
    }
    throw new Error("Failed to delete record. Please try again.");
  }
};
