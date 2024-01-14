import React from 'react';
import { useRouter } from 'next/router';

interface EventCardProps {
    eventTitle: string;
    id: string;
    onActivate: (id: string) => Promise<void>;
    onEdit: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ id, onActivate, onEdit, eventTitle }) => {
    const router = useRouter();

    const handleViewClick = async () => {
        try {
            await router.push(`/event/view/${id}`);
        } catch (error) {
            console.error('Error navigating to view event:', error);
        }
    };

    const handleEditClick = async () => {
        try {
            await router.push(`/event/edit/${id}`);
            onEdit(id);
        } catch (error) {
            console.error('Error navigating to edit event:', error);
        }
    };

    const handleActivateClick = async () => {
        try {
            await onActivate(id);
        } catch (error) {
            console.error('Error activating event:', error);
        }
    };

    return (
        <div className="relative w-[414px] h-[191px] top-[-2px] left-[-2px] rounded-[10px] border-[3px] border-solid border-[#9a9c9c] shadow-[2px_0px_4px_#00000040,0px_4px_4px_#00000040]">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{eventTitle}</div>
            </div>

            <div className="px-6 py-4">
                <button
                    className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full"
                    onClick={handleViewClick}
                >
                    View Event
                </button>
                <button
                    className="px-4 py-2 text-sm font-bold text-white bg-green-500 rounded-full ml-2"
                    onClick={handleEditClick}
                >
                    Edit Event
                </button>
                <button
                    className="px-4 py-2 text-sm font-bold text-white bg-yellow-500 rounded-full ml-2"
                    onClick={handleActivateClick}
                >
                    Activate
                </button>
            </div>
        </div>
    );
};

export default EventCard;
