'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import EventTierTable from '@/components/event/EventTierTable';
import PaymentsModal from '@/components/payments/PaymentsModal';
import Button from '@/components/ui/Button';
import StudentsTable from '@/components/ui/StudentsTable';
import type { ViewEvent } from '@/types/types';
import { VIEW_PORT_SIZES } from '@/utilities/constants';
import { fetchEventData } from '@/utilities/fetch/event';
import useWindowSize from '@/utilities/useWindowSize';

const DetailLine = ({ title, detail }: { detail: string; title: string }) => {
  return (
    <div className="flex justify-between text-sm w-full">
      <p className="font-semibold w-2/5">{title}</p>
      <p className="w-4/5">{detail}</p>
    </div>
  );
};

const ViewEventPage = ({ id }: { id: string }) => {
  const [queryParamsFinal, setQueryParamsFinal] = useState({
    studentPage: 1,
    studentSearchValue: '',
    studentItems: 10,
  });

  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const { width } = useWindowSize();

  const token = tokenQuery.data || '';

  const eventQuery = useQuery({
    queryKey: ['event', id, { ...queryParamsFinal }],
    queryFn: () => fetchEventData(token, id, queryParamsFinal),
  });

  const data: ViewEvent = eventQuery.data;

  const [queryParamsInitial, setQueryParamsInitial] = useState({
    studentSearchValue: '',
  });

  if (eventQuery.isFetched) {
    return (
      <>
        <section className="p-8 w-full border-b-2 relative">
          <div className="absolute">
            {width >= VIEW_PORT_SIZES.md && (
              <Link href={'/event/active'} className="">
                <span
                  className="icon-[material-symbols--arrow-back-rounded]"
                  style={{
                    width: '48px',
                    height: '48px',
                    color: '#724700',
                  }}
                  role="button"
                  onKeyUp={() => {}}
                  tabIndex={0}
                />
              </Link>
            )}
          </div>

          <h1 className="text-5xl text-navyBlue font-extrabold text-center capitalize">
            {data.title}
          </h1>
        </section>
        <section className="flex w-full my-10">
          <div className="flex flex-col gap-4 border-2 border-navyBlue mx-auto rounded-2xl p-5 md:w-4/5 w-96">
            <DetailLine title={'Event Description'} detail={data.description} />
            <DetailLine
              title={'Event Date'}
              detail={dayjs(data.date).format('MMM DD, YYYY')}
            />
            <DetailLine
              title={'Total People Registered'}
              detail={String(data.registeredStudentsCount)}
            />
            <DetailLine
              title={'Status'}
              detail={data.is_active ? 'Active' : 'Inactive'}
            />
            <DetailLine
              title={'Requires Payment'}
              detail={String(data.requires_payment)}
            />
            {data.earlyBirdAccessDate && (
              <DetailLine
                title={'Early Bird Access Date'}
                detail={dayjs(data.earlyBirdAccessDate).format('MMM DD, YYYY')}
              />
            )}
            <div className="flex md:flex-row flex-col gap-4 items-center mt-5 max-w-[70rem]">
              <PaymentsModal
                paymentType={'Accepted'}
                token={token}
                eventId={data.id}
              />
              <PaymentsModal
                paymentType={'Declined'}
                token={token}
                eventId={data.id}
              />
              <Link href={`/register/${data.form_name}`} className="w-full">
                <Button onClick={() => {}}>View Registration Form</Button>
              </Link>

              <Link href={`/event/edit/${data.id}`} className="w-full">
                <Button onClick={() => {}}>Edit Event</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="flex w-full my-10">
          <div className="flex flex-col gap-4 border-2 border-navyBlue mx-auto rounded-2xl md:w-4/5 w-96">
            <EventTierTable eventTiers={data.eventTiers} />
          </div>
        </section>
        <section className="md:w-4/5 w-96 mx-auto my-10 pb-8">
          <StudentsTable
            students={data.students}
            queryParamsInitial={queryParamsInitial}
            queryParamsFinal={queryParamsFinal}
            setQueryParamsInitial={setQueryParamsInitial}
            setQueryParamsFinal={setQueryParamsFinal}
            studentsMaxPage={data.studentsMaxPage}
          />
        </section>
      </>
    );
  }
};

export default ViewEventPage;
