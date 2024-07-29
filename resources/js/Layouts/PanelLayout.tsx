import AvatarIsLoggin from "@/Components/AvatarIsLoggin";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { Input } from "@/Components/ui/input";
import { Toaster } from "@/Components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Link, usePage } from "@inertiajs/react";
import { Frame, GalleryHorizontal, Home, Package2, Search, Settings, User2, WalletCards } from "lucide-react";
import React, { PropsWithChildren } from "react";

export const sidebar = [
    {
        name : "Dashboard",
        link : route('dashboard'),
        icon : <Home className="h-5 w-5" />,
    },
    {
        name : "Blog",
        link : route('dashboard.blog'),
        icon : <Frame className="h-5 w-5"/>,
    },
    {
        name : "Gallery",
        link : "",
        icon : <GalleryHorizontal className="h-5 w-5"/>,
    },
    {
        name : "Murid",
        link :"",
        icon : <User2 className="h-5 w-5"/>,
    },
    {
        name : "Guru",
        link : route('dashboard.user'),
        icon : <User2 className="h-5 w-5 bg-blue-300/40"/>,
    },
    {
        name : "Pembayaran",
        link : "",
        icon : <WalletCards className="h-5 w-5"/>
    }
]
export function Sidebar() {
    const path = window.location.href;
    
    return (
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {
                sidebar.map( (e,k) => (
                    <Tooltip key={k}>
                        <TooltipTrigger asChild>
                            <Link href={e.link} className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors  ${ e.link === path ? 'bg-blue-600 text-white' : 'hover:bg-blue-600/20 hover:text-foreground'}  md:h-8 md:w-8`}>
                                
                                <span className="sr-only">{e.name}</span>
                                { e.icon}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{e.name}</TooltipContent>
                    </Tooltip>
                ))
            }
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={route('dashboard.setting')}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
            
        </aside>
    )
}

export function NavigationBreadCrumb() {
    const currentPath = window.location.pathname.split("/").filter(segment => segment);
    return(
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {currentPath.map((segment, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {index === currentPath.length - 1 ? (
                                <BreadcrumbPage>{segment.charAt(0).toUpperCase() + segment.slice(1)}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={`/${currentPath.slice(0, index + 1).join('/')}`}>
                                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export function BottomBar() {
    return(
        <div className="fixed shadow-lg z-50 bottom-0 w-full p-4 border-t bg-blue-50 flex justify-around">
            {
                sidebar.map((e,i) => (
                    <div key={i} className="flex-1 flex justify-center mx-auto text-center">
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={e.link} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                                { e.icon  }
                                <span className="sr-only">{e.name}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top">{e.name}</TooltipContent>
                    </Tooltip>
                    </div>
                ))
            }
          </div>
    )
}

export default function PanelLayout({children} : PropsWithChildren) {
    return (
        <TooltipProvider>
            <Toaster/>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                        

                    <Sidebar/>
                <div className="sm:hidden">
                <BottomBar/>
                </div>
                
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    


                    <NavigationBreadCrumb/>
                <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                </div>
                <AvatarIsLoggin/>
                </header>
                <div className="p-4">
                {children}

                </div>
                
            </div>
            </div>
        </TooltipProvider>
    )
}