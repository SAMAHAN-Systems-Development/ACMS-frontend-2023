'use client';

import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

type FacilitatorType = {
  email: string;
  name: string;
};

type StudentType = {
  name: string;
  uuid: string;
  yearCourse: string;
};

type ButtonProps = {
  text: string;
  onClickHandler?: () => void;
};

const facilitators: FacilitatorType[] = [
  {
    name: 'john',
    email: 'john@addu.edu.ph',
  },
  {
    name: 'jane',
    email: 'jane@addu.edu.ph',
  },
  {
    name: 'christie',
    email: 'christie@addu.edu.ph',
  },
  {
    name: 'joe',
    email: 'joe@addu.edu.ph',
  },
];

const registeredStudents: StudentType[] = [
  {
    name: 'Alice',
    uuid: '123',
    yearCourse: 'Computer Science',
  },
  {
    name: 'Bob',
    uuid: '456',
    yearCourse: 'Engineering',
  },
];

const Button: FC<ButtonProps> = ({ text, onClickHandler }) => {
  return (
    <button
      className="bg-white text-black px-3 py-2 rounded-lg"
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-2">
      <input type="text" placeholder="Search" />
      <Button text="Search" />
    </div>
  );
};

const page = ({ params }: { params: { id: string } }) => {
  const handleViewAcceptedPayments = () => {
    console.log('View Accepted Payments button clicked!');
  };

  const handleViewDeclinedPayments = () => {
    console.log('View Declined Payments button clicked!');
  };

  return (
    <div className="container mx-auto">
      <div className="w-1/2 my-10">
        <h1 className="text-3xl">Event Name</h1>
        <p className="mb-3 text-xl">Event Price</p>
        <p>
          Sit aute sit amet mollit laboris anim deserunt enim eiusmod est id
          ullamco. Eu aliquip enim id in tempor dolor enim nisi id exercitation
          laborum.
        </p>

        <div className="my-3 space-y-2 space-x-2">
          <Link href={`/events/${params.id}/register`}>
            <Button text="View Form" />
          </Link>
          <Button
            text="View Accepted Payments"
            onClickHandler={handleViewAcceptedPayments}
          />
          <Button
            text="View Declined Payments"
            onClickHandler={handleViewDeclinedPayments}
          />
        </div>
      </div>

      <div className="my-10">
        <div className="flex justify-between">
          <p className="text-2xl">Facilitators</p>
          <SearchBar />
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th>{''}</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {facilitators.map((facilitator: FacilitatorType, index: number) => (
              <tr
                key={index}
                className="text-center even:bg-slate-600 odd:bg-slate-400"
              >
                <td>
                  <input type="checkbox" />
                </td>
                <td>{facilitator.name}</td>
                <td>{facilitator.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-10">
        <div className="flex justify-between">
          <p className="text-2xl">Registered Students</p>
          <SearchBar />
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th>{''}</th>
              <th>UUID</th>
              <th>Name</th>
              <th>Year & Course</th>
            </tr>
          </thead>
          <tbody>
            {registeredStudents.map((student: StudentType) => (
              <tr
                key={student.uuid}
                className="text-center even:bg-slate-600 odd:bg-slate-400"
              >
                <td>
                  <input type="checkbox" />
                </td>
                <td>{student.uuid}</td>
                <td>{student.name}</td>
                <td>{student.yearCourse}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
