'use client';

import { authService } from '@/services/auth/authService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define user type interface
interface User {
    name: string;
    email?: string;
    // Add other user properties as needed
}

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Use localStorage only in useEffect to avoid SSR issues
        try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            setUser(userData.user || null);
        } catch (error) {
            console.error('Error parsing user data:', error);
            setUser(null);
        }
    }, []);

    const logout = async () => {
        await authService.logout();
        router.push('/login');
    };

    const handleLogout = async () => {
        try {
            await logout();
            // The redirect and reload will be handled by the AuthContext
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const hidden = pathname === '/login' || pathname === '/register';

    if (hidden) {
        return null; // Don't render header on login/register pages
    }

    return (
        <header className="border-b border-neutral-200 bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/invoice"
                            className="text-xl font-bold text-white bg-blue-600 uppercase px-4 py-1 rounded-lg transition-colors"
                        >
                            Invoify
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex sm:items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                {/* User dropdown menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors">
                                            <Avatar>
                                                <AvatarFallback className="bg-blue-600 text-white">
                                                    {user.name ? getInitials(user.name) : "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                            </div>
                                            <ChevronDown size={16} className="text-gray-500" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600"
                                                          onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {user ? (
                            <>
                                <div className="flex items-center px-4 py-2">
                                    <Avatar className="h-8 w-8 mr-2 border border-blue-100">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                                            {user.name ? getInitials(user.name) : "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-gray-700 font-medium">{user.name}</div>
                                </div>
                                <div className="px-4 py-2 border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center text-red-600 hover:text-red-700"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
