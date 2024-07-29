import { buttonVariants } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import PanelLayout from "@/Layouts/PanelLayout";
import { Badge } from "@/Components/ui/badge";
import { Link} from "@inertiajs/react";
import { PageProps } from "@/types";


const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};


export default function Blog({blogs, auth} : PageProps<{blogs:Paginate}>) {
    return(
            <PanelLayout>
            <div className="flex gap-2 items-center md:p-10 bg-blue-400/10 rounded-md">
                        <div className="w-full">
                            <h2 className="text-5xl font-extrabold">Berita</h2>
                            <p>Informasi tentang Sekolah</p>
                        </div>
                        <Link href={route('dashboard.blog.create')} className={buttonVariants({variant:'default'})}>Buat berita</Link>
                    </div>
                    <Separator className="mt-5"/>

                    <Card>
                            <CardHeader className="px-7">
                                <CardTitle>Data Berita</CardTitle>
                                <CardDescription>
                                Berikut di bawah ini kelas-kelas yang di ampu oleh anda :
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Judul</TableHead>
                                            <TableHead>Sekilas</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Kategori
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Penerbit
                                            </TableHead>
                                            <TableHead className="text-right"> </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            blogs.data.map((e:Blog, k:number) => (
                                                <TableRow key={k} className={k%2 === 0 ? 'bg-accent' : ''}>
                                                <TableCell>
                                                    <div className="font-medium">{e.title}</div>
                                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                                        <Link className="text-blue-800 hover:underline" href={route('blog.slug', e.slug)}>
                                                            {route('blog.slug', e.slug)}
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{stripHtml(e.content).substring(0, 50)} ...</TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {e.category}
                                                    <div>
                                                        {e.tags}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Badge className="text-xs" variant="secondary">
                                                     {e.user.name}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                <Link target="_blank" href={route('dashboard.blog.update', e.id)} className={buttonVariants({variant:'default'})}>Update</Link>
                                                </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    
                                    
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
    
            </PanelLayout>
    )
}





