import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'

// URL definitions
let currentUrl = window.location.href;
let recipeLink = "https://www.megabytes.app/rec";
let createLink = "https://www.megabytes.app/cre";
let communityLink = "https://www.megabytes.app/com";
let profileLink = "https://www.megabytes.app/profile";

const navigation = [
    { name: 'Recipes', href: recipeLink, current: (currentUrl === recipeLink) },
    { name: 'Create', href: createLink, current: (currentUrl === createLink) },
    { name: 'Community', href: communityLink, current: (currentUrl === communityLink) },
];

const doLogout = event => {
    event.preventDefault();
    localStorage.removeItem("user_data")
    window.location.href = '/';
};

const goToProfile = event => {
    event.preventDefault();
    window.location.href = '/profile';
};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var username = '';
    if (ud === null) {
        window.location.href = '/';
    } else {
        username = ud.username;
    }

    return (
        <Disclosure as="nav" className="bg-#E79B11 fixed w-screen z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">		
                                <div className="flex flex-shrink-0 items-center">							
                                    <a href='https://www.megabytes.app/i'>
                                    </a>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'outline outline-3 outline-black text-black' : 'text-black hover:outline hover:outline-3 hover:outline-black hover:text-black',
                                                    'rounded-md px-2 py-1 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <a href="/profile" className="text-black hover:outline hover:outline-3 hover:outline-black hover:text-black rounded-md px-2 py-1 text-sm font-medium">{username || "My Profile"}</a>
                                <a href="/" onClick={doLogout} className="text-black hover:outline hover:outline-3 hover:outline-black hover:text-black rounded-md px-2 py-1 text-sm font-medium ml-4">Log Out</a>
                            </div>							
                        </div>			
                    </div>
                </>
            )}
        </Disclosure>
    )
}
