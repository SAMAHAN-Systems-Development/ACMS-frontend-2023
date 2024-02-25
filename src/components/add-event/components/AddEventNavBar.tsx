import AddEventNavbarButton from '@/components/add-event/components/AddEventNavbarButton'
import React from 'react'

const AddEventNavBar = () => {
    return (
        <div className='flex justify-between w-[100%] h-20 p-5 items-center text-[#181842] text-xl font-bold border-y-4 border-[#181842] '>
            <div>
                ACMS
            </div>

            <div className='flex gap-5 w-[30%] justify-evenly'>
                <AddEventNavbarButton text={'Home'} />
                <AddEventNavbarButton text={'Events'} />
                <AddEventNavbarButton text={'Logout'} />
            </div>
        </div>
    )
}

export default AddEventNavBar