// wrapper around the main content of the page including padding
// and the main content of the page

import React from 'react';


export default function Layout({ children }) {

return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 md:px-32">
                {children}
            </div>
        </div>
    );
}