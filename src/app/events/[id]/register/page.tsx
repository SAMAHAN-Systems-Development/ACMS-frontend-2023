'use client';

import type { FormEvent } from 'react';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl">{params.id}</h1>
      <p className="text-xl">
        Dolor ut minim esse veniam aute magna anim sit incididunt eu do Lorem
        eiusmod incididunt.
      </p>

      <div className="my-5">
        <p className="text-2xl text-center">Registration Form</p>
        <form
          className="w-fit mx-auto flex flex-col space-y-3 my-3"
          onSubmit={handleSubmitForm}
        >
          <div className="grid md:grid-cols-2 justify-between">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Last Name, First Name" />
          </div>
          <div className="grid md:grid-cols-2 justify-between">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="example@addu.edu.ph" />
          </div>
          <div className="grid md:grid-cols-2 justify-between">
            <label htmlFor="yearCourse">Year & Course</label>
            <input type="text" id="yearCourse" placeholder="BSCS 4" />
          </div>
          <input type="file" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default page;
