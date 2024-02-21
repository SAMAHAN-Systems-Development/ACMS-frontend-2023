import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';

const AddEvent = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="bg-slate-600">Add Event</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Add Event</Dialog.Title>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="name">
                            Event Title
                        </label>
                        <input className="Input border ml-3" id="name" />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <Switch.Root>
                            <Switch.Thumb />
                        </Switch.Root>
                        <label className="Label" htmlFor="price">
                            Event Price
                        </label>
                        <input className="Input border ml-2" id="price" />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="limit">
                            Event People Max Limit
                        </label>
                        <input className="Input border ml-3" id="limit" />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="desc">
                            Event Description
                        </label>
                        <textarea className="Input border ml-3" id="desc"></textarea>
                    </fieldset>
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                            <button className="Button green">Save Changes</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            Hatdog
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default AddEvent
