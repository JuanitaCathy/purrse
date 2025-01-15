import Navbar from '@/components/Navbar';
import React, {ReactNode} from 'react';

function OrganizersLayout({ children } : { children: ReactNode }) {
    return (
        <div className="relative flex h-screen w-full flex-col">
            <Navbar />
            <div className="max-w-7xl mx-auto">{children}</div>
        </div>
    )

}

export default OrganizersLayout;

