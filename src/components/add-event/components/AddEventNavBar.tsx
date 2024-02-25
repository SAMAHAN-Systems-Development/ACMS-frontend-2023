import AddEventNavbarButton from '@/components/add-event/components/AddEventNavbarButton'
import React from 'react'

const AddEventNavBar = () => {
    return (
        <div className='flex justify-between w-[100%]'>
            <div>
                ACMS
            </div>

            <div className='flex gap-5'>
                <AddEventNavbarButton text={'Home'} />
                <AddEventNavbarButton text={'Events'} />
                <AddEventNavbarButton text={'Logout'} />
            </div>
        </div>
    )
}

export default AddEventNavBar