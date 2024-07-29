import { Badge } from "@/Components/ui/badge";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem } from "@/Components/ui/pagination";
import { Progress } from "@/Components/ui/progress";
import { Separator } from "@/Components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { TooltipProvider } from '@/Components/ui/tooltip';
import PanelLayout from '@/Layouts/PanelLayout';
import { PageProps } from '@/types';
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Truck } from "lucide-react";

export default function Dashboard({ auth, murid, blogs, diskspace, setting }: PageProps<{setting : Setting, auth : Auth, diskspace : string|number|null, murid : number, blogs : Blog[]}>) {
    const date = new Date(setting?.updated_at ?? null);
    const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dateString = day[date.getDay()] + ', ' + date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear();
    return (
        <TooltipProvider>
            <PanelLayout>
                <Head title="Dashboard"></Head>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card
                            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                        >
                            <CardHeader className="pb-3">
                            <CardTitle>Selamat Datang {auth.user.name}</CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                                Permulaan untuk yang baru memasuki dashboard, anda bisa 
                                membuat artikel atau berita menarik. 
                            </CardDescription>
                            </CardHeader>
                            <CardFooter>
                            <Link className={buttonVariants({variant:"default"})} href={route('dashboard.absen')}>Absen Sekarang</Link>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-05-chunk-1">
                            <CardHeader className="pb-2">
                            <CardDescription>Tahun Ajaran ini</CardDescription>
                            <CardTitle className="text-4xl text-blue-800">{murid}  <span className="text-sm">Murid</span></CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +25% dari tahun sebelumnya
                            </div>
                            </CardContent>
                            <CardFooter>
                                <Separator/>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-05-chunk-2">
                            <CardHeader className="pb-2">
                            <CardDescription>Pembayaran Bulan Ini</CardDescription>
                            <CardTitle className="text-4xl">5,329 <span className="text-sm">Rupiah</span></CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +10% dari bulan sebelumnya
                            </div>
                            </CardContent>
                            <CardFooter>
                            <Progress value={10} aria-label="12% increase" />
                            </CardFooter>
                        </Card>
                        </div>
                        <Card>
                            <CardHeader className="px-7">
                                <CardTitle>Berita</CardTitle>
                                <CardDescription>
                                Terakhir di publish
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Kategori
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Pembuat
                                        </TableHead>
                                        <TableHead className="text-right">
                                            
                                        </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            blogs.map(e => (
                                                <TableRow key={e.id} className="bg-accent">
                                                    <TableCell>
                                                        <div className="font-medium">{e.title}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {route('blog.slug', e.slug)}
                                                        </div>
                                                    </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            {e.category}
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            {e.user.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link href={route('dashboard.blog.update', e.id)} className={buttonVariants({variant : 'default'})}>
                                                                Edit
                                                            </Link>
                                                        </TableCell>
                                                </TableRow>
                                            ))
                                        }                                    
                                    
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="px-7">
                                <CardTitle>Data Kelas Mengajar</CardTitle>
                                <CardDescription>
                                Berikut di bawah ini kelas-kelas yang di ampu oleh anda :
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kelas</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Mata Pelajaran
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Kurikulum
                                            </TableHead>
                                            <TableHead className="text-right"> </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="bg-accent">
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                            liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                            Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                        </TableRow>
                                    
                                    
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        
                    </div>
                    <div>
                        <Card
                        className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                        >
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                { setting && (
                                    <>
                                    Jabatan di tahun pelajaran {setting?.id}/{setting?.id+1}
                                    
                                    </>
                                )}
                                <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                                </Button>
                            </CardTitle>
                            <CardDescription>Dimulai sejak {dateString}</CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <Truck className="h-3.5 w-3.5" />
                                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                Track Order
                                </span>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">More</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Trash</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                {
                                    auth.history.map(r => (
                                        <div key={r.id}>
                                            <div className="font-semibold">{r.jabatan}</div>

                                            <Separator className="my-2" />

                                        </div>
                                    ))
                                }
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                            <div className="text-xs text-muted-foreground">
                            Updated <time dateTime="2023-11-23">November 23, 2023</time>
                            </div>
                            <Pagination className="ml-auto mr-0 w-auto">
                            <PaginationContent>
                                <PaginationItem>
                                <Button size="icon" variant="outline" className="h-6 w-6">
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span className="sr-only">Previous Order</span>
                                </Button>
                                </PaginationItem>
                                <PaginationItem>
                                <Button size="icon" variant="outline" className="h-6 w-6">
                                    <ChevronRight className="h-3.5 w-3.5" />
                                    <span className="sr-only">Next Order</span>
                                </Button>
                                </PaginationItem>
                            </PaginationContent>
                            </Pagination>
                        </CardFooter>
                        </Card>
                    </div>
                </main>

            </PanelLayout>
        </TooltipProvider>
    );
}

// export default function Dashboard({ auth }: PageProps) {
//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">You're logged in!</div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
