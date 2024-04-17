import { NavLink, Outlet } from "react-router-dom";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from '../assets/logo.png'
import avatar from '../assets/avatar.png'

const navigation = (isLoggedIn) => {
  if (isLoggedIn) {
    return [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Users", href: "/users" },
      { name: "Sign Out", href: "/signout-user" },
    ];
  } else {
    return [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Users", href: "/users" },
      { name: "Create User", href: "/create-user" },
      { name: "Sign In", href: "/signin-user" },
    ];
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RootLayout({signedUser}) {
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation(signedUser.state).map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <img
                          className="h-12  rounded-full"
                          src={signedUser.state?signedUser.avatar:avatar}
                          alt="signin"
                    />
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              {({ close }) => (
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigation(signedUser.state).map((item) => (
                    <NavLink
                      key={item.name}
                      as={NavLink}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                      onClick={close}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export function RootIndex() {
  return (
    <div className="my-16">
      <div className="flex justify-center my-4">
        <h1 className="text-4xl block">Welcome</h1>
      </div>
      <div className="flex justify-center">
          <img src={logo} className="object-contain  w-80 logo transform rotate-90" />
      </div>
    </div>
  );
}