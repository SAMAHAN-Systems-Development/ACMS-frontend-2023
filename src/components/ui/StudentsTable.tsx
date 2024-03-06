'use client';

import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import TextField from '@/components/ui/TextField';
import type { Student } from '@/types/types';

const PAGE_SIZE = 10;

const StudentsTable = ({ list }: { list: Student[] }) => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [shownStudents, setShownStudents] = useState<Student[]>([]);

  const handleSearchStudents = (list: Student[], query: string) => {
    const inputValue = query.trim().toLowerCase();
    const filteredList = list.filter(
      (student: Student) =>
        student.firstName.toLowerCase().includes(inputValue) ||
        student.lastName.toLowerCase().includes(inputValue) ||
        student.year_and_course.toLowerCase().includes(inputValue) ||
        `${student.firstName} ${student.lastName}`.includes(inputValue)
    );

    setShownStudents(filteredList);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearchStudents(list, query);
  }, [list, query]);

  const totalPages = Math.ceil(shownStudents.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderStudentsForPage = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return shownStudents.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Registered Students</p>
        <div>
          <TextField
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
            value={query}
            label="Search"
            name="search"
          />
        </div>
      </div>
      <div className="rounded-3xl rounded-tr-3xl border-navyBlue border-2 mt-3">
        <table className="w-full text-center">
          <thead className="border-b-2">
            <tr>
              <th className="w-[30%] py-5">UUID</th>
              <th className="w-[30%]">Name</th>
              <th className="w-[30%]">Year & Course</th>
              <th className="w-[10%]">{''}</th>
            </tr>
          </thead>
          <tbody>
            {renderStudentsForPage().map((student: Student) => (
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
                  <Link
                    href={`/student?uuid=${student.uuid}`}
                    className="text-navyBlue underline"
                  >
                    View More
                  </Link>
                </td>
              </tr>
            ))}
            {shownStudents.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-5">
                  <p className="me-0">&quot;{query}&quot; not found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => handlePageChange(1)} className="px-4 py-2 mx-1">
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mx-1"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <select
          value={currentPage}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            handlePageChange(Number(event.target.value))
          }
          className="px-4 py-2 mx-1"
        >
          {Array.from({ length: totalPages }, (__, index) => (
            <option key={index + 1} value={index + 1}>
              Page {index + 1}
            </option>
          ))}
        </select>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-1"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 mx-1"
        >
          Last
        </button>
      </div>
    </>
  );
};

export default StudentsTable;
