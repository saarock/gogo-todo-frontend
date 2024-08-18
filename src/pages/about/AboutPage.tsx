import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import useTokenValidation from "../../hooks/useTokenValidation.ts";

const teamMembers = [
    {
        name: 'Pratik Singh rathour',
        role: 'CEO',
        image: 'data:image/jpeg;base64,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',
        github: 'https://github.com/johndoe',
        instagram: 'https://instagram.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
    },
    {
        name: 'Aayush Banset',
        role: 'CTO',
        image: 'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9lNmE2MjliMjU3M2M5ODBkN2Q3NzM1ZjI0NWVjZmE5ZT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.r83sm6QN8RI9T2gD91JHpYygbNgmoMFOB7jNF5c2D9I',
        github: 'https://github.com/janesmith',
        instagram: 'https://instagram.com/saarock',
        linkedin: 'https://linkedin.com/in/saarock',
        twitter: 'https://twitter.com/saarock',
    },
    // Add more team members as needed
]

const AboutPage = () => {
    return (
        <div className="min-h-screen text-gray-900">
            <main className="container mx-auto px-4 py-16">
                <section id="about" className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gogo-primary">
                        About Us
                    </h2>
                    <p className="text-lg text-gray-400">
                        Our mission is to create the best products for our
                        customers. We are a team of dedicated professionals
                        committed to delivering high-quality solutions.
                    </p>
                </section>

                <section className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-gogo-primary">
                        Our Team
                    </h2>
                    <div className="flex flex-wrap justify-center space-x-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden m-4"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-gogo-primary mb-4">
                                        {member.role}
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaGithub
                                                size={30}
                                                className="hover:text-gogo-primary transition-colors duration-300"
                                            />
                                        </a>
                                        <a
                                            href={member.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaInstagram
                                                size={30}
                                                className="hover:text-gogo-primary transition-colors duration-300"
                                            />
                                        </a>
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaLinkedin
                                                size={30}
                                                className="hover:text-gogo-primary transition-colors duration-300"
                                            />
                                        </a>
                                        <a
                                            href={member.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaTwitter
                                                size={30}
                                                className="hover:text-gogo-primary transition-colors duration-300"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default React.memo(AboutPage)
