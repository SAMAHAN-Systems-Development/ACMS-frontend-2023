import React from 'react'
import * as Label from '@radix-ui/react-label'

type Props = {
    title: string,
    required?: boolean,
    type?: string
}

const AddEventInput = (props: Props) => {
    return (
        <div className=''>
            {/* <Label.Root htmlFor={props.title} className='p-[0,0.5em] mb-[0.5em] left-[3em] top-[-0.28em]' >{props.title}</Label.Root> */}
            <input className=" border-2 rounded-lg p-2" {...props} />
        </div>
    )
}

export default AddEventInput