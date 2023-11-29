import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import './styles.css';
//name for location, href: location address, current: if active on that page
let currentUrl = window.location.href;
let recipeLink = "https://www.megabytes.app/rec";
let createLink = "https://www.megabytes.app/cre";
let communityLink = "https://www.megabytes.app/com";
let profileLink = "https://www.megabytes.app/profile";

const navigation = [
	{ name: 'Recipes', href: recipeLink, current: (currentUrl == recipeLink) },
	{ name: 'Create', href: createLink, current: (currentUrl == createLink) },
	{ name: 'Community', href: communityLink, current: (currentUrl == communityLink) },
]

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
	if (ud === null) {
		window.location.href = '/';
	} else {
		var username = ud.username;

	}

	return (
		<Disclosure as="nav" className="bg-#E79B11 fixed w-screen z-50 border-b-4 border-black">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center justify-between">
							{/* Left side - Navigation items */}
							<div className="flex-1 flex items-center justify-start">
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current ? 'outline outline-3 outline-black text-black' : 'text-black hover:outline hover:outline-3 hover:outline-black hover:text-black',
													'rounded-md px-3 py-2 text-lg font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>

							{/* Center - MegaBytes Text */}
							<div className="flex-none text-center">
								<a href="/rec" className="text-3xl font-bold no-underline hover:underline">
									MegaBytes
								</a>
							</div>

							{/* Right side - Account information with dropdown */}
							<div className="flex-1 flex items-center justify-end">
								<Menu as="div" className="relative inline-block text-left">
									<div>
										<Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-#E79B11">
											Account: {username}
											{/* Icon can be added here */}
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{/* Dropdown Menu Items */}
											<Menu.Item>
												{({ active }) => (
													<a
														href="/profile"
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														My Profile
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="/"
														onClick={doLogout}
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Log Out
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);

}