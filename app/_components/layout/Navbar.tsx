"use client"

import { Fragment, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";

const macthes = [
    {
        name: 'Live',
        description: 'Its game time! Find out the latest scores here',
        href: '/live',
        icon: ChartPieIcon,
    },
    {
        name: 'Fixtures',
        description: 'Discover the big games that are coming up',
        href: '/fixtures',
        icon: CursorArrowRaysIcon,
    },
]

// const callsToAction = [
//     { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//     { name: 'Contact sales', href: '#', icon: PhoneIcon },
//     { name: 'View all products', href: '#', icon: RectangleGroupIcon },
// ]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // @ts-ignore
    return (
        <header className="relative bg-base-100 isolate z-10">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-4" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">{process.env.COMPANY_NAME}</span>
                        <img className="h-24 w-auto" src="/live-football.svg" alt="live-football" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover>
                        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6">
                            Matches
                            <ChevronDownIcon className="h-5 w-5 flex-none " aria-hidden="true"/>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 -translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute inset-x-0 top-0 -z-10  pt-14 shadow-lg ring-1 ring-gray-900/5 bg-base-300">
                                <div
                                    className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                                    {macthes.map((item) => (
                                        <div key={item.name}
                                             className="group relative rounded-lg p-6 text-sm leading-6 hover:">
                                            <div
                                                className="flex h-11 w-11 items-center justify-center rounded-lg  group-hover:">
                                                <item.icon className="h-6 w-6  group-hover:text-primary"
                                                           aria-hidden="true"/>
                                            </div>
                                            <a href={item.href} className="mt-6 block font-semibold ">
                                                {item.name}
                                                <span className="absolute inset-0"/>
                                            </a>
                                            <p className="mt-1 ">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                                {/*<div className="">*/}
                                {/*    <div className="mx-auto max-w-7xl px-6 lg:px-8">*/}
                                {/*        <div className="grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5">*/}
                                {/*            {callsToAction.map((item) => (*/}
                                {/*                <a*/}
                                {/*                    key={item.name}*/}
                                {/*                    href={item.href}*/}
                                {/*                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6  hover:bg-gray-100"*/}
                                {/*                >*/}
                                {/*                    <item.icon className="h-5 w-5 flex-none " aria-hidden="true" />*/}
                                {/*                    {item.name}*/}
                                {/*                </a>*/}
                                {/*            ))}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </Popover.Panel>
                        </Transition>
                    </Popover>


                    <Link href="/leagues" className="text-sm font-semibold leading-6 ">
                        Leagues
                    </Link>
                    {/*<Link href="/teams" className="text-sm font-semibold leading-6 ">*/}
                    {/*    Teams*/}
                    {/*</Link>*/}


                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="#" className="text-sm font-semibold leading-6 ">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-base-300  px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">{process.env.COMPANY_NAME}</span>
                            <img className="h-24 w-auto" src="/live-football.svg" alt="live-football" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 "
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {/*<Disclosure as="div" className="-mx-3">*/}
                                {/*    {({open}: any) => (*/}
                                {/*        <>*/}
                                {/*            <Disclosure.Button*/}
                                {/*                className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5  font-semibold leading-7  hover:">*/}
                                {/*                Product*/}
                                {/*                <ChevronDownIcon*/}
                                {/*                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}*/}
                                {/*                    aria-hidden="true"*/}
                                {/*                />*/}
                                {/*            </Disclosure.Button>*/}
                                {/*            <Disclosure.Panel className="mt-2 space-y-2">*/}
                                {/*                {products.map((item) => (*/}
                                {/*                    <Disclosure.Button*/}
                                {/*                        key={item.name}*/}
                                {/*                        as="a"*/}
                                {/*                        href={item.href}*/}
                                {/*                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7  hover:"*/}
                                {/*                    >*/}
                                {/*                        {item.name}*/}
                                {/*                    </Disclosure.Button>*/}
                                {/*                ))}*/}
                                {/*            </Disclosure.Panel>*/}
                                {/*        </>*/}
                                {/*    )}*/}
                                {/*</Disclosure>*/}
                                <Link
                                    href="/live"
                                    className="-mx-3 block rounded-lg px-3 py-2  font-semibold leading-7  hover:"
                                >
                                    Live Matches
                                </Link>
                                <Link
                                    href="/fixtures"
                                    className="-mx-3 block rounded-lg px-3 py-2  font-semibold leading-7  hover:"
                                >
                                    Fixtures
                                </Link>

                                <Link
                                    href="/leagues"
                                    className="-mx-3 block rounded-lg px-3 py-2  font-semibold leading-7  hover:"
                                >
                                    Leagues
                                </Link>
                                {/*<Link*/}
                                {/*    href="/teams"*/}
                                {/*    className="-mx-3 block rounded-lg px-3 py-2  font-semibold leading-7  hover:"*/}
                                {/*>*/}
                                {/*    Teams*/}
                                {/*</Link>*/}


                            </div>
                            <div className="py-6">
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5  font-semibold leading-7  hover:"
                                >
                                Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
