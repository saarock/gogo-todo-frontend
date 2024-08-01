// src/components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* About Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-lg font-semibold mb-4 text-gogo-primary">
                            About Us
                        </h2>
                        <p className="text-gray-400">
                            We are dedicated to providing top-notch services and
                            creating an exceptional user experience. Explore our
                            website to learn more about what we offer.
                        </p>
                    </div>
                    {/* Contact Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-lg font-semibold mb-4 text-gogo-primary">
                            Contact Us
                        </h2>
                        <ul>
                            <li className="mb-2">
                                <a
                                    href="mailto:saarock4646@gmail.com"
                                    className="text-gray-400 hover:text-gogo-primary"
                                >
                                    saarock4646@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+9823464648"
                                    className="text-gray-400 hover:text-gogo-primary"
                                >
                                    +9823464648
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Social Media Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-lg font-semibold mb-4 text-gogo-primary">
                            Follow Us
                        </h2>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/saarock"
                                target={`_blank`}
                                className="text-gray-400 hover:text-gogo-primary"
                                aria-label="GitHub"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.44 2.86 8.22 6.84 9.54.5.09.68-.22.68-.48v-1.72c-2.77.6-3.36-1.34-3.36-1.34-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03 1.23 2.11 3.22 1.51 4.01 1.16.12-.89.48-1.51.87-1.86-2.72-.31-5.56-1.37-5.56-6.1 0-1.35.49-2.46 1.29-3.33-.13-.31-.56-1.58.12-3.28 0 0 1.04-.33 3.42 1.25A11.9 11.9 0 0 1 12 5.8a11.9 11.9 0 0 1 3.12.43c2.38-1.57 3.42-1.25 3.42-1.25.67 1.7.25 2.97.12 3.28.8.87 1.29 1.98 1.29 3.33 0 4.74-2.84 5.79-5.56 6.1.48.42.91 1.26.91 2.54v3.73c0 .26.18.57.68.48A9.986 9.986 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/coder-aayush-885ab9267/"
                                target={`_blank`}
                                className="text-gray-400 hover:text-gogo-primary"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 0H5C3.343 0 2 1.343 2 3v18c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM8.676 19H6.674v-10h2.002v10zm-1-11.351a1.192 1.192 0 0 1-1.19-1.192c0-.654.537-1.191 1.19-1.191.654 0 1.19.537 1.19 1.191s-.536 1.192-1.19 1.192zM18.668 19h-2.002v-5.583c0-1.336-.027-3.056-1.866-3.056-1.866 0-2.153 1.464-2.153 2.968V19h-2.001v-10h1.911v1.362h.027c.266-.5.917-1.029 1.895-1.029 2.023 0 2.397 1.332 2.397 3.063V19z" />
                                </svg>
                            </a>
                            {/* Add more social icons as needed */}
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="text-center mt-6 border-t border-gogo-border pt-4">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Saarock. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
