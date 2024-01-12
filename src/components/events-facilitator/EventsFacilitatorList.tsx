import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const EventsFacilitatorList: React.FC<Props> = ({
    children
}) => {
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5'>
            {children}
        </div>
    )
}
