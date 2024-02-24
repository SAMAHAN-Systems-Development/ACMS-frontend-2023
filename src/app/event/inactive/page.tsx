// 'use client';
// // import React, { useCallback, useEffect, useState } from 'react';

// // import EventCard from '@/components/event/EventCard';

// // interface Event {
// //   id: string;
// //   title: string;
// // }

// const PageFinal: React.FC = () => {
//   // const backendUrl =
//   //   process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

//   // const [listOfInactiveEvents, setListOfInactiveEvents] = useState<Event[]>([]);

//   // const fetchInactiveEvents = useCallback(async () => {
//   //   try {
//   //     const response = await fetch(`${backendUrl}/events`, { method: 'GET' });
//   //     const data = await response.json();
//   //     setListOfInactiveEvents(data);
//   //   } catch (error) {
//   //     console.error('Error fetching inactive events:', error);
//   //   }
//   // }, [backendUrl]);

//   // useEffect(() => {
//   //   void fetchInactiveEvents();
//   // }, [fetchInactiveEvents]);

//   // const handleActivateEvent = (id: string) => {
//   //   fetch(`${backendUrl}/event/activate/${id}`, {
//   //     method: 'POST',
//   //   })
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       console.log('Event activated:', data);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error activating event:', error);
//   //     });
//   // };

//   // const handleEditEvent = (id: string) => {
//   //   console.log('Editing event with ID:', id);
//   // };

//   return (
//     <div>
//       <h1>List of Inactive Events</h1>
//       {/* {listOfInactiveEvents.map((event) => (
//         <EventCard
//           key={event.id}
//           id={event.id}
//           onActivate={handleActivateEvent}
//           eventTitle={event.title}
//           onEdit={handleEditEvent}
//         />
//       ))} */}
//     </div>
//   );
// };

// export default PageFinal;
