'use client'

import { Student } from '@/types/types';
import { fetchStudent } from '@/utilities/fetch/student';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSearchParams } from 'next/navigation'


export const StudentPage = () => {
    const searchParams = useSearchParams()
    const uuid = searchParams.get('uuid')
    const tokenQuery = useQuery<string>({
        queryKey: ['jwt'],
    });

    const token = tokenQuery.data || '';

        const studentQuery = useQuery<{student: Student, isFound:boolean }>({
            queryKey: ['student', { uuid: uuid }],
            queryFn: () => fetchStudent(token, uuid || ''),
        });
        
        const { student, isFound } = studentQuery.data || {
            student: [],
            isFound: false
        };

        return (
                <div className="w-full min-h-screen flex items-center justify-center p-4 ">
                        {isFound ? (
                        <div className="lg:w-4/12 md:w-6/12 w-8/12  flex flex-col items-center justify-center text-center gap-2 border-navyBlue border-solid border-2 rounded-3xl p-5 ">
                            <div className="font-bold">
                                {student.event.title}
                            </div>
                            <div>
                                <img src='/sampleQR.svg' alt='sample QR' width={125} height={125} />
                            </div>
                            <div className="font-bold">
                                {student.uuid}
                            </div>
                            <div>
                                {student.firstName + ' ' + student.lastName}
                            </div>
                            <div>
                                {student.year_and_course}
                            </div>
                        </div>

                        ):(

                        <div className="lg:w-4/12 md:w-6/12 w-8/12 text-navyBlue flex flex-col items-center justify-center text-center gap-2 border-navyBlue border-solid border-2 rounded-lg p-5 ">
                            <div className="font-bold">
                                <img src="/ErrorIcon.svg" alt="Error Icon SVG" width={80} height={80} />
                            </div>
                            <div className="font-bold">
                                STUDENT NOT FOUND
                            </div>
                        </div>

                        )
                        }
                    </div>
        
        )
    }
