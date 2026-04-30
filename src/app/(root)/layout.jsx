import { onBoardUser } from '@/modules/auth/actions'
import React from 'react'

const Layout = async ({ children }) => {
    await onBoardUser()
    return (
        <div className='flex flex-col min-h-screen relative overflow-x-hidden'>
            <div
                className="fixed inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-size-[16px_16px]"
            />
            <div className='flex-1 w-full mt-20'>
                {children}
            </div>
        </div>
    )
}

export default Layout