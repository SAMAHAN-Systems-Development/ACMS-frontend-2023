'use client';

import React from 'react';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import PaymentsModal from '@/components/payments/PaymentsModal';
import Button from '@/components/ui/Button';
import StudentsTable from '@/components/ui/StudentsTable';
import type { Event } from '@/types/types';
import { VIEW_PORT_SIZES } from '@/utilities/constants';
import { fetchEventData } from '@/utilities/fetch/event';
import moneyFormatter from '@/utilities/moneyFormatter';
import useWindowSize from '@/utilities/useWindowSize';

const DetailLine = ({ title, detail }: { detail: string; title: string }) => {
  return (
    <div className="flex justify-between text-sm">
      <p className="font-semibold w-1/5">{title}</p>
      <p className="w-4/5">{detail}</p>
    </div>
  );
};

const ViewEventPage = ({ id }: { id: string }) => {
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const { width } = useWindowSize();

  const token = tokenQuery.data || '';

  const eventQuery = useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventData(token, id),
  });

  const data: Event = eventQuery.data;

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
                  color: '#181842',
                }}
                role="button"
                onKeyUp={() => {}}
                tabIndex={0}
              />
            </Link>
          )}
        </div>

        <h1 className="text-5xl text-navyBlue font-extrabold text-center capitalize">
          {eventQuery.data.title}
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
            title={'Crowd Limit'}
            detail={String(data.max_participants)}
          />
          <DetailLine
            title={'Students Registered'}
            detail={eventQuery.data.students.length}
          />
          <DetailLine
            title={'Event Price:'}
            detail={moneyFormatter(data.price)}
          />
          <div className="flex md:flex-row flex-col gap-4 items-center mt-5 max-w-[50rem]">
            <PaymentsModal
              paymentType={'accepted'}
              token={token}
              eventId={data.id}
            />
            <PaymentsModal
              paymentType={'declined'}
              token={token}
              eventId={data.id}
            />
            <Link href={`/register/${data.form_name}`} className="w-full">
              <Button onClick={() => {}}>View Registration Form</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="md:w-4/5 w-96 mx-auto my-10">
        {eventQuery.isFetching ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <StudentsTable list={data.students} />
        )}
      </section>
    </>
  );
};

export default ViewEventPage;
