import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import PanelLayout from "@/Layouts/PanelLayout";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Editor as TinyMCEEditor } from 'tinymce';


export default function BlogCreate({category, auth} : PageProps<{category:BlogCategory[]}>) {
    const ref = useRef<TinyMCEEditor | null>(null);
    const [image, setImage] = useState<File|null>(null);
    const [imagePrev, setImagePrev] = useState<string|null>(null);
    const [title, setTitle] = useState<string|null>(null);
    const [categories, setCategories] = useState<string|null>(null);
    const [categorys, setCategorys] = useState<BlogCategory[]>(category)
    const [tags, setTags] = useState<string|null>(null);
    const [categoryAdd, setCategoryAdd] = useState<string|null>(null);

    const log = async () => {
        const content = ref.current?.getContent();
        console.log({image, title, categories, tags, content})
        if (!ref.current || !title || !image || !categories || !tags) return;
            router.post(route("dashboard.blog.create.post"), {
                title,
                tag : tags,
                category : categories,
                content,
                thumbnail : image
            });
      };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const width = img.width;
                    const height = img.height;

                    // Check if aspect ratio is 16:9
                    if (width / height === 16 / 9) {
                        if(file) {
                            setImage(file);
                        }
                        setImagePrev(reader.result as string);
                    } else {
                        toast("Gambar harus memiliki aspek rasio 16:9", {
                            description: "Pastikan membaca peraturan publikasi",
                            action: {
                              label: "Undo",
                              onClick: () => console.log("Undo"),
                            },
                          })
                    }
                };

                img.src = reader.result as string;

            };
            reader.readAsDataURL(file);
        }
    };

    const addCategory = async () => {
        if(!categoryAdd) return;
        const response =  await axios.post(route('dashboard.blog.categories.post'), { name : categoryAdd.trim()})
        const updatedCategories = response.data as BlogCategory;
        setCategorys(prev => (
            [
                ...prev,
                {
                    id : updatedCategories.id,
                    name : categoryAdd.trim()
                }
            ]
        ))
    }
      
    return (
        <PanelLayout>
           <div className="grid grid-cols-3">
                <div className="p-5">
                    <div className="text-center text-4xl mb-5 text-blue-700 font-bold">Create Blog</div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                        <Label htmlFor="title">Judul Berita</Label>
                        <Input type="text" onChange={e => setTitle(e.target.value)} id="title" placeholder="title" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                        <Label htmlFor="category">Kategori</Label>
                        <Select onValueChange={e => setCategories(e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    auth.user.id && (
                                        <div className="flex w-full max-w-sm items-center pt-5 space-x-2 px-10">
                                            <Input type="text" onChange={e => setCategoryAdd(e.target.value)} className="text-sm" placeholder="Ketikkan Kategori baru" />
                                            <Button type="submit" onClick={addCategory}>+</Button>
                                        </div>
                                    )
                                }
                                <SelectGroup>
                                    <SelectLabel>Pilih Kategori</SelectLabel>
                                    {
                                        categorys.map((e,k) => (
                                            <SelectItem key={k} value={e.name}>{e.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                        <Label htmlFor="tags">Tag berita</Label>
                        <Input type="text" onChange={e => setTags(e.target.value)} id="tags" placeholder="tags" />
                    </div>

                    Unggah Gambar sebagai thumbnail (rasio 16x9)
                    <div className="my-3 ">
                        {
                            imagePrev && (
                                <img src={imagePrev}></img>
                            )
                        }
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" onChange={handleImageChange} type="file" className="hidden" />
                        </label>
                    </div> 

                </div>

                <div className="col-span-2">
                <Editor
                    apiKey={"40ta8takugnboum64avwqu6rrc3j176mqkd2g39w9k753m8z"}
                    onInit={(_evt, editor) => ref.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                    <button onClick={log}>Log editor content</button>
                </div>
           </div>
        </PanelLayout>
    )
}