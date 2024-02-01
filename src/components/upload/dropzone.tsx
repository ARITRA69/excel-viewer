"use client";
import React, { useCallback, ReactElement, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import TableView from "./table-view";

interface CsvData {
  [key: string]: any;
}

const Dropzone = (): ReactElement => {
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[][]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file || !file.name.toLowerCase().endsWith(".csv")) {
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: "Please Select a valid CSV file",
      });
      return;
    }

    setSelectedFile(file);

    console.log("Accepted Files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  } as any);

  const handleUpload = async () => {
    if (selectedFile) {
      const parsedData = await parseCsvFile(selectedFile);
      setCsvData(parsedData);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setCsvData([]);
    setSelectedTags([]);
  };

  const handleAddTags = (index: number, selectedTag: string) => {
    const newSelectedTags = [...selectedTags];

    if (!newSelectedTags[index]) {
      newSelectedTags[index] = [];
    }

    if (!newSelectedTags[index].includes(selectedTag)) {
      newSelectedTags[index] = [...newSelectedTags[index], selectedTag];
      setSelectedTags(newSelectedTags);
    }
  };

  const handleRemoveTag = (index: number, tagToRemove: string) => {
    const newSelectedTags = [...selectedTags];

    if (newSelectedTags[index]) {
      newSelectedTags[index] = newSelectedTags[index].filter(
        (tag) => tag !== tagToRemove
      );
      setSelectedTags(newSelectedTags);
    }
  };

  const parseCsvFile = (file: File): Promise<CsvData[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse<CsvData[]>(file, {
        complete: (result) => {
          const data: CsvData[] = result.data;
          resolve(data);
        },
        header: true,
        skipEmptyLines: true,
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
          reject(error);
        },
      });
    });
  };

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

  return (
    <div className="space-y-5 w-full">
      <div className="flex flex-col items-center justify-center w-max mx-auto gap-y-5">
        <div
          {...getRootProps()}
          className={`p-8 text-center ${
            isDragActive
              ? "border bg-[#605BFF]"
              : "border-2 border-dashed border-[#605BFF]"
          } cursor-pointer w-11/12 lg:w-[500px]`}
        >
          <input {...getInputProps()} />
          <div className="text-lg flex flex-col lg:flex-row items-center gap-1">
            <span className="hidden lg:block">Drag & drop </span>
            <Image
              src="/excel-logo.png"
              width={300}
              height={300}
              alt="excel-logo"
              className="h-10 w-10"
            />
            <span>here, or click to select</span>
          </div>
        </div>

        {selectedFile && (
          <span>
            Selected file: {selectedFile.name} (
            {(selectedFile.size / 1024).toFixed(2)} KB)
          </span>
        )}
        {!selectedFile ? (
          <Button className="w-full" onClick={handleUpload} disabled>
            Upload
          </Button>
        ) : (
          <div className="flex justify-between gap-5 w-full">
            <Button
              className="w-full"
              variant="destructive"
              onClick={handleRemoveFile}
            >
              Remove
            </Button>
            <Button className="w-full bg-[#605BFF]" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        )}
      </div>
      {/* {csvData.length > 0 && (
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
                      onValueChange={(value: any) =>
                        handleAddTags(index, value)
                      }
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
      )} */}
      {csvData.length > 0 && (
        <TableView
          csvData={csvData}
          selectedTags={selectedTags}
          handleAddTags={handleAddTags}
          handleRemoveTag={handleRemoveTag}
        />
      )}
    </div>
  );
};

export default Dropzone;
