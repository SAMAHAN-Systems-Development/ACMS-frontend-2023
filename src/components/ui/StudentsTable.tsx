'use client';

import type { ChangeEvent } from 'react';
import React from 'react';
import Link from 'next/link';

import TextField from '@/components/ui/TextField';
import type { StudentViewEvent } from '@/types/types';

type PropTypes = {
  queryParamsFinal: {
    studentItems: number;
    studentPage: number;
    studentSearchValue: string;
  };
  queryParamsInitial: {
    studentSearchValue: string;
  };
  setQueryParamsFinal: React.Dispatch<
    React.SetStateAction<{
      studentItems: number;
      studentPage: number;
      studentSearchValue: string;
    }>
  >;
  setQueryParamsInitial: React.Dispatch<
    React.SetStateAction<{
      studentSearchValue: string;
    }>
  >;
  students: StudentViewEvent[];
  studentsMaxPage: number;
};

const StudentsTable: React.FC<PropTypes> = ({
  students,
  queryParamsInitial,
  setQueryParamsInitial,
  queryParamsFinal,
  setQueryParamsFinal,
  studentsMaxPage,
}) => {
  const handlePageChange = (page: number) => {
    setQueryParamsFinal({
      ...queryParamsFinal,
      studentPage: page,
    });
  };

  //The length of the students is always 10

  students = students.concat(
    Array.from({ length: 10 - students.length }, () => dummyStudent)
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Registered Students</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 mx-1"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(queryParamsFinal.studentPage - 1)}
            className="px-4 py-2 mx-1"
            disabled={queryParamsFinal.studentPage === 1}
          >
            Prev
          </button>
          <select
            value={queryParamsFinal.studentPage}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              handlePageChange(Number(event.target.value))
            }
            className="px-4 py-2 mx-1"
          >
            {Array.from({ length: studentsMaxPage }, (__, index) => (
              <option key={index + 1} value={index + 1}>
                Page {index + 1}
              </option>
            ))}
          </select>
          <button
            onClick={() => handlePageChange(queryParamsFinal.studentPage + 1)}
            className="px-4 py-2 mx-1"
            disabled={queryParamsFinal.studentPage === studentsMaxPage}
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(studentsMaxPage)}
            className="px-4 py-2 mx-1"
          >
            Last
          </button>
        </div>
        <div className="flex gap-2">
          <TextField
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQueryParamsInitial({
                ...queryParamsInitial,
                studentSearchValue: event.target.value,
              })
            }
            value={queryParamsInitial.studentSearchValue}
            label="Search"
            name="search"
            onKeyUp={async (event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                setQueryParamsFinal({ ...queryParamsFinal, studentPage: 1 });
                setQueryParamsFinal({
                  ...queryParamsFinal,
                  studentSearchValue: queryParamsInitial.studentSearchValue,
                });
              }
            }}
          />
          <div className="border-2 bg-navyBlue flex justify-center items-center rounded">
            <span
              className="icon-[material-symbols--search]"
              style={{
                width: '34px',
                height: '24px',
                color: '#FFFFFF',
              }}
              onClick={async () => {
                setQueryParamsFinal({ ...queryParamsFinal, studentPage: 1 });
                setQueryParamsFinal({
                  ...queryParamsFinal,
                  studentSearchValue: queryParamsInitial.studentSearchValue,
                });
              }}
              role="button"
              onKeyUp={() => {}}
              tabIndex={0}
            />
          </div>
        </div>
      </div>
      <div className="rounded-3xl rounded-tr-3xl border-navyBlue border-2 mt-3">
        <table className="w-full text-center">
          <thead className="border-b-2">
            <tr>
              <th className="w-[24%] py-5">UUID</th>
              <th className="w-[22%]">Name</th>
              <th className="w-[22%]">Year & Course</th>
              <th className="w-[22%]">Event Tier</th>
              <th className="w-[10%]">{''}</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: StudentViewEvent, index: number) => (
              <tr
                key={student.uuid + index}
                className="even:bg-slate-600 odd:bg-slate-400 border-t-2 hover:bg-blue"
              >
                <td className="py-2">{student.uuid}</td>
                <td className="p-2">
                  {student.firstName} {student.lastName}
                </td>
                <td className="py-2">{student.year_and_course}</td>
                <td className="py-2">{student.eventTier}</td>
                <td className="border-l-2 py-2">
                  {student.uuid !== '' ? (
                    <Link
                      href={`/student?uuid=${student.uuid}`}
                      className="text-navyBlue underline"
                    >
                      View More
                    </Link>
                  ) : (
                    <p className="text-gray">View More</p>
                  )}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-5">
                  <p className="me-0">No Student/s Found</p>
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

const dummyStudent: StudentViewEvent = {
  eventTier: '',
  firstName: '',
  lastName: '',
  uuid: '',
  year_and_course: '',
};
