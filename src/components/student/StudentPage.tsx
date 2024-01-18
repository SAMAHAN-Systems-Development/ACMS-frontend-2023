'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type Student from '@/types/Student';


const ViewStudentPage = () => {
    const { uuid } = useParams();
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await fetch(`/student/${uuid}`);
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        (async () => {
            await fetchStudentDetails();
        })().catch((error) => {
            console.error('Error handling fetchStudentDetails promise:', error);
        });
    }, [uuid]);

    return (
        <div>
            {student && (
                <div>
                    <h2>QR Code</h2>

                    <h2>Name</h2>
                    <p>{`${student.firstName} ${student.lastName}`}</p>

                    <h2>Year and Course</h2>
                    <p>{student.year_and_course}</p>

                    <h2>Event Name</h2>
                    <p>{student.event.title}</p>

                    <h2>Payment Photo</h2>
                    <img src={student.payment.payment.photo_src} alt="PaymentImg" />
                </div>
            )}
        </div>
    );
};

export default ViewStudentPage;