"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import { FolderGit2, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { checkAndAddUser } from '../actions'

const Navbar = () => {
    const {user} = useUser()
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()
    const navLinks = [
        {
            label: 'Collaborations',
            href: '/general-projects'
        },
        {
            label: 'My Projects',
            href: '/'
        }
    ]

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
       checkAndAddUser(user.primaryEmailAddress.emailAddress, user.fullName)
        }
    }, [user])

    const isActiveLink = (href: string) =>
        pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

    const renderLinks = (classNames: string) =>
        navLinks.map(({ href, label }) => {
            return <Link key={href} href={href} className={`btn-sm ${classNames} ${isActiveLink(href) ? "btn-primary" : ""}`}>
                {label}
            </Link>
        })


    return (
        <div className='border-b border-base-200 px-5 md:px-[10%] py-4 relative'>
            <div className="flex justify-between items-center">
                <div className='flex items-center'>
                    <div className='bg-primary-content text-primary rounded-full p-2'>
                        <FolderGit2 size={24} />
                    </div>
                    <span className='ml-3 font-bold text-3xl'>
                        Strat<span className="text-primary">Edge</span>
                    </span>
                </div>
                <button className='btn w-fit btn-sm sm:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className='w-4' />
                </button>
                <div className='hidden sm:flex space-x-4 items-center'>
                    {renderLinks("btn")}
                    <UserButton />
                </div>
            </div>

            <div className={`absolute top-0 w-full h-screen flex flex-col gap-2 p-4 transition-all duration-300 sm:hidden bg-base-100 z-50 ${menuOpen ? 'left-0' : '-left-full'}`}>
                <div className="flex justify-between">
                    <UserButton />
                    <button className='btn w-fit btn-sm' onClick={() => setMenuOpen(!menuOpen)}>
                        <X size={24} />
                    </button>
                </div>
                {renderLinks("btn")}
            </div>
        </div>
    )
}

export default Navbar