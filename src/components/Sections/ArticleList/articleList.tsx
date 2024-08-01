"use client";

import React, { useEffect, useState } from "react";
import { fetchArticles, deleteMultipleRecords, deleteRecordById } from "@/lib/service";
import { DataType } from "@/lib/types";
import {
  sectors,
  regions,
  endYears,
  topics,
  pests,
  sources,
  countries,
} from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertDateFormat } from "@/lib/functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationDemo } from "@/components/Sections/ArticleList/pagination"; // Adjust import path as needed
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DeleteIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    query: "",
    sector: "",
    region: "",
    end_year: "",
    topic: "",
    pestle: "",
    source: "",
    country: "",
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("selectedIds") || "[]"))
  );

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArticles(currentPage, filters);
        setArticles(data.articles);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [currentPage, filters]);

  useEffect(() => {
    // Update selected IDs based on stored IDs and current articles
    const storedIds = JSON.parse(localStorage.getItem("selectedIds") || "[]");
    const updatedSelectedIds = new Set(storedIds);
    setSelectedIds(
      (prevIds) =>
        new Set(
          [...prevIds].filter(
            (id) =>
              articles.some((article) => article._id.toString() === id) ||
              updatedSelectedIds.has(id)
          )
        )
    );
  }, [articles]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value === "all" ? "" : value,
    });
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedSelectedIds = new Set(selectedIds);
    if (checked) {
      updatedSelectedIds.add(id);
    } else {
      updatedSelectedIds.delete(id);
    }
    setSelectedIds(updatedSelectedIds);
    localStorage.setItem(
      "selectedIds",
      JSON.stringify(Array.from(updatedSelectedIds))
    );
    console.log("Selected IDs:", Array.from(updatedSelectedIds)); // Log the updated IDs
  };

  const handleHeaderCheckboxChange = (checked: boolean) => {
    const updatedSelectedIds = new Set<string>();
    if (checked) {
      articles.forEach((article) =>
        updatedSelectedIds.add(article._id.toString())
      );
    }
    setSelectedIds(updatedSelectedIds);
    localStorage.setItem(
      "selectedIds",
      JSON.stringify(Array.from(updatedSelectedIds))
    );
  };

  const handleDeleteSelected = async () => {
    try {
      const idsToDelete = Array.from(selectedIds);
      await deleteMultipleRecords(idsToDelete);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => !selectedIds.has(article._id.toString()))
      );
      setSelectedIds(new Set());
      localStorage.setItem("selectedIds", JSON.stringify([]));
    } catch (error) {
      console.error("Error deleting selected records:", error);
    }
  };

  const handleDeleteSingle = async (id: string) => {
    try {
      await deleteRecordById(id);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id.toString() !== id)
      );
      setSelectedIds((prevIds) => {
        const updatedIds = new Set(prevIds);
        updatedIds.delete(id);
        localStorage.setItem("selectedIds", JSON.stringify(Array.from(updatedIds)));
        return updatedIds;
      });
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="p-2 sm:p-5 max-w-screen-lg m-auto">
      <div className="mb-4 flex flex-wrap sm:justify-between gap-2">
        <Input
          type="text"
          name="query"
          placeholder="Search..."
          value={filters.query}
          onChange={handleFilterChange}
          className="w-full"
        />
        {/* Filter dropdowns */}
        {[
          { name: "sector", placeholder: "Sectors", options: sectors },
          { name: "region", placeholder: "Regions", options: regions },
          {
            name: "end_year",
            placeholder: "Years",
            options: endYears.map((year) => String(year)),
          },
          { name: "topic", placeholder: "Topics", options: topics },
          { name: "pestle", placeholder: "PESTLE", options: pests },
          { name: "source", placeholder: "Sources", options: sources },
          { name: "country", placeholder: "Countries", options: countries },
        ].map(({ name, placeholder, options }) => (
          <Select
            key={name}
            onValueChange={(value) => handleSelectChange(name, value)}
            value={filters[name]}
          >
            <SelectTrigger className="w-fit md:w-[132px] h-8">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All {placeholder}</SelectItem>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div>
          <div className="text-sm px-4 py-2 border border-b-0 rounded-t-lg flex justify-between items-center">
            <div>Selected {selectedIds.size} out of {totalRecords} rows</div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <DeleteIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the selected records.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteSelected}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <Table className="border rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">
                  <Checkbox
                    checked={articles.every((article) =>
                      selectedIds.has(String(article._id))
                    )}
                    onCheckedChange={(checked) =>
                      handleHeaderCheckboxChange(Boolean(checked))
                    }
                  />
                </TableHead>
                <TableHead className="px-4">Title</TableHead>
                <TableHead className="hidden sm:flex items-center">
                  Published
                </TableHead>
                <TableHead>More</TableHead>
                {/* Add other table headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow
                  key={article._id}
                  className={`${
                    selectedIds.has(String(article._id)) ? "bg-muted" : ""
                  }`}
                >
                  <TableCell className="px-4">
                    <Checkbox
                      checked={selectedIds.has(String(article._id))}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          String(article._id),
                          Boolean(checked)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    <div className="flex flex-col gap-1">
                    <span>{article.title}</span>
                    <span className="text-xs sm:hidden">Published : {convertDateFormat(article.published)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-nowrap hidden sm:flex">
                    {convertDateFormat(article.published)}
                  </TableCell>
                  <TableCell className="px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-8 h-8 hover:bg-muted flex justify-center items-center">
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View/Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteSingle(article._id.toString())}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-sm px-4 py-2 border border-t-0 rounded-b-lg">
            <PaginationDemo
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
