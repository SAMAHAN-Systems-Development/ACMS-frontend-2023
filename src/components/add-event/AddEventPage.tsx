'use client'

import React from 'react'
import * as Switch from '@radix-ui/react-switch';
import * as Form from '@radix-ui/react-form';
import AddEventInput from '@/components/add-event/components/AddEventInput';

// title, description, date, crowd limit, requires-payment-switch, price


const AddEventPage = () => {
    return (
        <div className='flex justify-center items-center h-screen flex-col gap-8'>
            <h1 className=' font-bold'>Add new event</h1>
            <div>
                <Form.Root>
                    <Form.Field className="FormField" name="title">
                        <div className='flex items-baseline justify-between'>
                            <Form.Label className="FormLabel">Event Title</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter the event title.
                            </Form.Message>
                            {/* <Form.Message className="FormMessage" match="typeMismatch">
                                Please provide a valid email
                            </Form.Message> */}
                        </div>
                        <Form.Control asChild>
                            <AddEventInput title="title" required />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="description">
                        <div className='flex items-baseline justify-between'>
                            <Form.Label className="FormLabel">Description</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter a description.
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <textarea className=" border-2 rounded-lg p-2" required />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="date">
                        <div className='flex items-baseline justify-between'>
                            <Form.Label className="FormLabel">Event Date</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter a date.
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <AddEventInput title='date' type='date' required />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="requires-payment">
                        <div className='flex items-baseline justify-between'>
                            <Form.Label className="FormLabel">Requires Payment</Form.Label>

                        </div>
                        <Form.Control asChild>
                            <Switch.Root >
                                <Switch.Thumb />
                            </Switch.Root>
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="crowd-limit">
                        <div className='flex items-baseline justify-between'>
                            <Form.Label className="FormLabel">Crowd Limit</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter a crowd limit.
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <AddEventInput title='crowd-limit' type='number' />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="price">
                        <div className='flex items-baseline justify-between'>
                            <Form.Label className="FormLabel">Event Price</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter a price.
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <AddEventInput title='price' type='number' />
                        </Form.Control>
                    </Form.Field>

                    <Form.Submit asChild>
                        <button className="Button" style={{ marginTop: 10 }}>
                            Add Event
                        </button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </div>
    )
}

export default AddEventPage


//  <Dialog.Root>
//      <Dialog.Trigger asChild>
//          <button className="bg-slate-600">Add Event</button>
//      </Dialog.Trigger>
//      <Dialog.Portal>
//          <Dialog.Overlay className="DialogOverlay" />
//          <Dialog.Content className="DialogContent">
//              <Dialog.Title className="DialogTitle">Add Event</Dialog.Title>
//              <fieldset className="Fieldset">
//                  <label className="Label" htmlFor="name">
//                      Event Title
//                  </label>
//                  <input className="Input border ml-3" id="name" />
//              </fieldset>
//              <fieldset className="Fieldset">
//                  <Switch.Root>
//                      <Switch.Thumb />
//                  </Switch.Root>
//                  <label className="Label" htmlFor="price">
//                      Event Price
//                  </label>
//                  <input className="Input border ml-2" id="price" />
//              </fieldset>
//              <fieldset className="Fieldset">
//                  <label className="Label" htmlFor="limit">
//                      Event People Max Limit
//                  </label>
//                  <input className="Input border ml-3" id="limit" />
//              </fieldset>
//              <fieldset className="Fieldset">
//                  <label className="Label" htmlFor="desc">
//                      Event Description
//                  </label>
//                  <textarea className="Input border ml-3" id="desc"></textarea>
//              </fieldset>
//              <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
//                  <Dialog.Close asChild>
//                      <button className="Button green">Save Changes</button>
//                  </Dialog.Close>
//              </div>
//              <Dialog.Close asChild>
//                  <button className="IconButton" aria-label="Close">
//                      Hatdog
//                  </button>
//              </Dialog.Close>
//          </Dialog.Content>
//      </Dialog.Portal>
//  </Dialog.Root>