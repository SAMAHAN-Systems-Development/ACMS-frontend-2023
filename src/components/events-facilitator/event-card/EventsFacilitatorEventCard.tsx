import React from 'react'

type Props = {
  title: string,
  description: string
}

export const EventsFacilitatorEventCard: React.FC<Props> = ({
  title,
  description
}) => {
  return (
    <div className='p-5'>
      <div className='flex flex-col gap-2'>
        <h2>{title}</h2>
        <p>{description}</p>

      </div>
    </div>
  )
}
