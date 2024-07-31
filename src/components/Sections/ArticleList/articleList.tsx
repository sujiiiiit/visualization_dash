"use client";

import React, { useEffect, useState } from "react";
import { fetchArticles } from "@/lib/service";
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
import { Checkbox } from "@/components/ui/checkbox";

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
    new Set(JSON.parse(localStorage.getItem('selectedIds') || '[]'))
  );

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
    console.log(updatedSelectedIds)
    if (checked) {
      updatedSelectedIds.add(id);
    } else {
      updatedSelectedIds.delete(id);
    }
    setSelectedIds(updatedSelectedIds);
    localStorage.setItem('selectedIds', JSON.stringify(Array.from(updatedSelectedIds)));
  };

  const handleHeaderCheckboxChange = (checked: boolean) => {
    const updatedSelectedIds = new Set<string>();
    if (checked) {
      articles.forEach(article => updatedSelectedIds.add(article._id.toString()));
    }
    setSelectedIds(updatedSelectedIds);
    localStorage.setItem('selectedIds', JSON.stringify(Array.from(updatedSelectedIds)));
  };

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
    // Sync selected rows with new page data
    const updatedSelectedIds = new Set<string>(JSON.parse(localStorage.getItem('selectedIds') || '[]'));
    setSelectedIds(updatedSelectedIds);
  }, [articles]);

  return (
    <div className="p-2 sm:p-5 max-w-screen-lg">
      <div className="mb-4 flex flex-wrap sm:justify-between gap-2">
        <Input
          type="text"
          name="query"
          placeholder="Search..."
          value={filters.query}
          onChange={handleFilterChange}
          className="w-full"
        />
        <Select
          onValueChange={(value) => handleSelectChange("sector", value)}
          value={filters.sector}
        >
          <SelectTrigger className="w-fit md:w-[132px] h-8">
            <SelectValue placeholder="Sectors" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelectChange("region", value)}
          value={filters.region}
        >
          <SelectTrigger className="w-fit md:w-[132px] h-8">
            <SelectValue placeholder="Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelectChange("end_year", value)}
          value={filters.end_year}
        >
          <SelectTrigger className="w-fit md:w-[132px] h-8">
            <SelectValue placeholder="Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Years</SelectItem>
              {endYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelectChange("topic", value)}
          value={filters.topic}
        >
          <SelectTrigger className="w-fit md:w-[132px] h-8">
            <SelectValue placeholder="Topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Topics</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelectChange("pestle", value)}
          value={filters.pestle}
        >
          <SelectTrigger className="w-fit md:w-[132px] h-8">
            <SelectValue placeholder="PESTLE" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All PESTLE</SelectItem>
              {pests.map((pest) => (
                <SelectItem key={pest} value={pest}>
                  {pest}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelectChange("source", value)}
          value={filters.source}
        >
          <SelectTrigger className="w-fit md:w-[132px] h-8">
            <SelectValue placeholder="Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Sources</SelectItem>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelectChange("country", value)}
          value={filters.country}
        >
          <SelectTrigger className="w-fit md:w-[132px] h-8">
            <SelectValue placeholder="Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div>
          <div className="text-sm px-4 py-2 border border-b-0 rounded-t-lg">Selected {selectedIds.size} out of {totalRecords} rows</div>
          <Table className="border rounded-lg ">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">
                  <Checkbox
                    checked={articles.every(article => selectedIds.has(String(article._id)))}
                    onCheckedChange={(checked) => handleHeaderCheckboxChange(Boolean(checked))}
                  />
                </TableHead>
                <TableHead className="px-4">Title</TableHead>
                <TableHead className="hidden sm:flex">Published</TableHead>
                <TableHead>More</TableHead>
                {/* Add other table headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article._id} className={`${selectedIds.has(String(article._id))?"bg-muted":''}`}>
                  <TableCell className="px-4">
                    <Checkbox
                      checked={selectedIds.has(String(article._id))}
                      onCheckedChange={(checked) => handleCheckboxChange(String(article._id), Boolean(checked))}
                    />
                  </TableCell>
                  <TableCell className="px-4 text-sm">{article.title}</TableCell>
                  <TableCell className="text-nowrap hidden sm:flex">{convertDateFormat(article.published)}</TableCell>
                  <TableCell className="px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-8 h-8 hover:bg-muted flex justify-center items-center">
                          <DotsHorizontalIcon className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View/Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
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
