import React from 'react'

type Props = {
    text: String,

}

const AddEventNavbarButton = ({ text }: Props) => {
    return (
        <button className='p-5'>
            {text}
        </button>
    )
}

export default AddEventNavbarButton