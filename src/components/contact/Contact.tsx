import './contact.css'
import React from 'react'
import { Button } from '../index.ts'
import { ContactCompProps } from '../../types'

export default function Contact(props: ContactCompProps) {
    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gogo-primary">
                        Contact Us
                    </h1>
                    <p className="mt-2 text-gray-600">
                        We'd love to hear from you!
                    </p>
                </header>
                <form className="space-y-4" onSubmit={props.onSubmit}>
                    <textarea
                        className="w-full p-4 border border-gogo-border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gogo-primary"
                        placeholder="Your message here..."
                        rows="6"
                        onChange={props.onChange}
                        value={props.message}
                    ></textarea>
                    <Button
                        className="w-full py-2 px-4 bg-gogo-button text-white rounded-lg shadow-md hover:bg-gogo-button-hover"
                        text="submit"
                        type={'submit'}
                    />
                </form>
            </div>
        </>
    )
}
