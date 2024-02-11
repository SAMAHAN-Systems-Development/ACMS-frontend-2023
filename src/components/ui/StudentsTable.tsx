"use client";

import type { ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/Button";
import type { Student } from "@/types/types";

export const Input = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={query}
      />
    </div>
  );
};

const StudentsTable = ({ list }: { list: Student[] }) => {
  const [query, setQuery] = useState("");
  const [shownStudents, setShownStudents] = useState<Student[]>([]);

  const handleSearchStudents = (list: Student[], query: string) => {
    const inputValue = query.trim().toLowerCase();
    const filteredList = list.filter(
      (student: Student) =>
        student.firstName.toLowerCase().includes(inputValue) ||
        student.lastName.toLowerCase().includes(inputValue) ||
        student.year_and_course.toLowerCase().includes(inputValue)
    );

    setShownStudents(filteredList);
  };

  useEffect(() => {
    handleSearchStudents(list, query);
  }, [list, query]);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Registered Students</p>
        <div>
          <Input query={query} setQuery={setQuery} />
        </div>
      </div>
      <div className="rounded-3xl rounded-tr-3xl border-navyBlue border-2 mt-3">
        <table className="w-full text-center">
          <thead className="border-b-2">
            <tr>
              <th className="w-[30%] py-5">UUID</th>
              <th className="w-[30%]">Name</th>
              <th className="w-[30%]">Year & Course</th>
              <th className="w-[10%]">{""}</th>
            </tr>
          </thead>
          <tbody>
            {shownStudents.length > 0 ? (
              shownStudents.map((student: Student) => (
                <tr
                  key={student.uuid}
                  className="even:bg-slate-600 odd:bg-slate-400 border-t-2"
                >
                  <td>{student.uuid}</td>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  <td>{student.year_and_course}</td>
                  <td className="border-l-2">
                    <Link href={`/student/${student.uuid}`}>
                      <Button text="View More" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-5">
                  <p className="me-0">&quot;{query}&quot; not found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentsTable;
