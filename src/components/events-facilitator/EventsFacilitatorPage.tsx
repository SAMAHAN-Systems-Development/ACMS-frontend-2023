import React from 'react'
import PropTypes from 'prop-types'
import { EventsFacilitatorList } from '@/components/events-facilitator/EventsFacilitatorList'
import { EventsFacilitatorEventCard } from '@/components/events-facilitator/event-card/EventsFacilitatorEventCard'

type Props = {

}

export const EventsFacilitatorPage: React.FC = ({

}: Props) => {
    return (
        <section className='flex justify-center items-center'>
            <EventsFacilitatorList>
                <EventsFacilitatorEventCard title='Event Title' description='Event Description' />
            </EventsFacilitatorList>
        </section>
    )
}

