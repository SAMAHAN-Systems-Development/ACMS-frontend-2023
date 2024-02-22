import React from 'react'

type Props = {
    title: string,
    required?: boolean,
    type?: string
}

const AddEventInput = (props: Props) => {
    return (
        <input className=" border-2 rounded-lg p-2" {...props} />
    )
}

export default AddEventInput