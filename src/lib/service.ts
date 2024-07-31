// service.ts
import axios from "axios";
import { DataType } from "./types";

const API_URL =  "http://localhost:5000/api";
// const API_URL =  "https://blackcofferapi.vercel.app/api";

export const fetchArticles = async (
  page: number = 1,
  filters: any = {}
): Promise<{ articles: DataType[]; totalPages: number; currentPage: number;totalRecords:number; }> => {
  try {
    const response = await axios.get<{ articles: DataType[]; totalPages: number; currentPage: number;totalRecords:number; }>(
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
