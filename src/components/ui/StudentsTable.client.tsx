'use client';

import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/ui/Button';
import type { Student } from '@/types/types';

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
  const [query, setQuery] = useState('');
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
        <p className="text-2xl">Registered Students</p>
        <div>
          <Input query={query} setQuery={setQuery} />
        </div>
      </div>
      <table className="w-full text-center mt-3">
        <thead>
          <tr>
            <th className="w-1/12">{''}</th>
            <th className="w-1/3">UUID</th>
            <th className="w-1/4">Name</th>
            <th className="w-1/4">Year & Course</th>
            <th className="w-1/12">{''}</th>
          </tr>
        </thead>
        <tbody>
          {shownStudents.map((student: Student) => (
            <tr
              key={student.uuid}
              className="even:bg-slate-600 odd:bg-slate-400"
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{student.uuid}</td>
              <td>
                {student.firstName} {student.lastName}
              </td>
              <td>{student.year_and_course}</td>
              <td>
                <Link href={`/student/${student.uuid}`}>
                  <Button text="View" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentsTable;
