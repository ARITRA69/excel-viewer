import React, { ReactElement, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CsvData {
  [key: string]: any;
}

interface TableViewProps {
  csvData: CsvData[];
  selectedTags: string[][];
  handleAddTags: (index: number, selectedTag: string) => void;
  handleRemoveTag: (index: number, tagToRemove: string) => void;
}

const TableView = ({
  csvData,
  selectedTags,
  handleAddTags,
  handleRemoveTag,
}: TableViewProps): ReactElement => {
  const tableData = csvData.map((row) => ({
    id: row.id,
    link: row.links,
    prefix: row.prefix,
    selectTags: row["select tags"].split(",").map((tag: any) => tag.trim()),
    selectedTags: row["selected tags"],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentTableData = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <Table className="w-11/12 mx-auto">
        <TableHeader className="whitespace-nowrap">
          <TableRow className="border-b border-[#605BFF]">
            <TableHead>ID</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Prefix</TableHead>
            <TableHead>Select Tags</TableHead>
            <TableHead>Selected Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <Link
                  href={`https://${row.link}`}
                  className="text-blue-500"
                  target="_blank"
                >
                  {row.link}
                </Link>
              </TableCell>
              <TableCell>{row.prefix}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value: any) => handleAddTags(index, value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={selectedTags[index] || "Select tag"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {row.selectTags.map((tag: string, i: number) => (
                      <SelectItem key={i} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {selectedTags[index] && (
                  <div className="space-x-2">
                    {selectedTags[index].map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs p-2 bg-[#605bff] text-white rounded cursor-pointer"
                        onClick={() => handleRemoveTag(index, tag)}
                      >
                        {tag} x
                      </span>
                    ))}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex items-center gap-3">
            {Array.from({
              length: Math.ceil(tableData.length / perPage),
            }).map((_, index) => (
              <Button
                key={index}
                variant={`${
                  currentPage === index + 1 ? "default" : "secondary"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableView;
