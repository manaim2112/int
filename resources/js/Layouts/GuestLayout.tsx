import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Guest({ children, logo }: { logo?: string, children?: ReactNode}) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    { 
                        logo ? (
                            <img src={"/storage/" + logo} alt='logo' className='h-40 w-40'/>
                        ) : 
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    }
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
