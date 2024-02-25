// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import PendingPaymentsCard from '@/components/payments/PendingPaymentsCard';
// import type Payment from '@/types/Payment';

// type propTypes = {
//   acceptAllButtonAction: ([]) => void;
//   declineAllButtonAction: ([]) => void;
//   listOfPayments: Payment[];
// };

// const PendingPaymentsPage: React.FC<propTypes> = ({
//   listOfPayments,
//   acceptAllButtonAction,
//   declineAllButtonAction,
// }) => {
//   const [checkedCards, setCheckedCards] = useState<string[]>([]);
//   const router = useRouter();

//   const toggleSelectAll = () => {
//     setCheckedCards((prevCheckedCards) => {
//       return prevCheckedCards.length === listOfPayments.length
//         ? []
//         : listOfPayments.map((payment) => payment.id);
//     });
//   };

//   const ViewDeclinedPaymentsButtonAction = async () => {
//     try {
//       await router.push(`/payments/declined`);
//     } catch (error) {
//       console.error('Error navigating to declined payments page:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-end">
//         <button
//           className="px-4 py-2 text-sm text-white bg-[#181842] rounded-md hover:bg-[#99A0B8]"
//           onClick={() => ViewDeclinedPaymentsButtonAction()}
//         >
//           View Declined Payments
//         </button>
//       </div>

//       <div className="mt-4 text-[3rem] font-bold">
//         PENDING PAYMENT VERIFICATION
//       </div>

//       <div className="">
//         <label>
//           <input type="checkbox" onClick={toggleSelectAll} />
//           Select All
//         </label>

//         <div className="flex gap-2 py-2">
//           <button
//             className="px-4 py-2 text-sm text-white bg-[#181842] rounded-md hover:bg-[#99A0B8]"
//             onClick={() => declineAllButtonAction(checkedCards)}
//           >
//             Decline All Selected
//           </button>
//           <button
//             className="px-4 py-2 text-sm text-white bg-[#181842] rounded-md hover:bg-[#99A0B8]"
//             onClick={() => acceptAllButtonAction(checkedCards)}
//           >
//             Accept All Selected
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-3 gap-6">
//         {listOfPayments.map((payment: Payment) => (
//           <PendingPaymentsCard
//             key={payment.id}
//             eventPrice={payment.event.price}
//             eventTitle={payment.event.title}
//             onCheckedAction={() => {
//               if (checkedCards.includes(payment.id)) {
//                 setCheckedCards(
//                   checkedCards.filter(
//                     (checkedCard) => checkedCard !== payment.id
//                   )
//                 );
//               } else {
//                 setCheckedCards([...checkedCards, payment.id]);
//               }
//             }}
//             acceptButtonAction={() => acceptAllButtonAction([payment.id])}
//             declineButtonAction={() => declineAllButtonAction([payment.id])}
//             studentName={`${payment.firstName} ${payment.lastName}`}
//             paymentPhotoUrl={payment.payment.photo_src}
//             checked={checkedCards.includes(payment.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PendingPaymentsPage;
