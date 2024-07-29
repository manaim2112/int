import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/Components/ui/navigation-menu"
import { PageProps } from "@/types"
import AvatarIsLoggin from "./AvatarIsLoggin"
import { Link } from "@inertiajs/react"

export default function Navbar({ LogoText, LogoImage, auth} : PageProps<{LogoText?:string, LogoImage?:string}>)  {
    return(
        <div className="bg-white p-3 shadow">
                <div className="container flex gap-4 items-center">
                    <div className="font-bold w-20">
                        <Link href="/">
                            {LogoImage ? (
                                <img src={LogoImage} alt="Logo Image" className="h-6"/>
                            ) : LogoText}
                        </Link>
                        </div>
                    <div className="w-full">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/docs">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Tentang Kami
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/blog">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Blog
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="relative">
                                <NavigationMenuTrigger>Program Tech</NavigationMenuTrigger>
                                <NavigationMenuContent className="p-1">
                                    <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="w-full">
                                <NavigationMenuTrigger>Program Tech</NavigationMenuTrigger>
                                <NavigationMenuContent className="p-2">
                                    <NavigationMenuLink>Link 2</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    </div>
                    <div className="">
                        {
                            auth.user ? <AvatarIsLoggin/> : (
                                <>
                                    <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Masuk
                                        </Link>
                                        <>
                                        </>
                                        
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
    )
}