import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>

										<Menu.Button className={classNames(
											profileLink == currentUrl ? 'relative flex rounded-full outline outline-3 outline-black px-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800' :
												'relative flex rounded-full  px-2 py-1 text-sm hover:outline hover:outline-3 hover:outline-black ',
											'rounded-md px-3 py-1 text-sm font-medium'
										)}>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											{username}
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
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<p id="profile-go" class="buttons"
														className={classNames(active ? 'bg-gray-100 cursor-pointer rounded-md' : '', ' rounded-md cursor-pointer block px-4 py-2 text-sm text-gray-700')}
														onClick={goToProfile}> MyProfile </p>
												)}
											</Menu.Item>

											<Menu.Item>
												{({ active }) => (
													<p id="logout-go" class="buttons"
														className={classNames(active ? 'bg-gray-100 cursor-pointer rounded-md' : '', ' rounded-md cursor-pointer block px-4 py-2 text-sm text-gray-700')}
														onClick={doLogout}> Log Out </p>
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
	)
}