// api.ts
import axios from "axios";
import { DataType } from "./types";

const API_URL =  "http://localhost:5000";

export const fetchArticles = async (
  page: number = 1,
): Promise<{ articles: DataType[]; totalPages: number; currentPage: number }> => {
  try {
    const response = await axios.get<{ articles: DataType[]; totalPages: number; currentPage: number }>(
      `${API_URL}/search`,
      {
        params: {
          page,
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
