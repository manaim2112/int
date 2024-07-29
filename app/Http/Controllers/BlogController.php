<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index() {

        return Inertia::render("Blog");
    }

    public function slug(string $slug) {

        $d = Blog::with('user')->where("slug", "=", $slug)->firstOrFail();


        return Inertia::render("BlogSlug", ["slug" => $slug, "data" => $d]);
    }


    public function storeComment(Request $request, $blogId)
    {
        $request->validate([
            'author' => 'required|string|max:255',
            'comment' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        Comment::create([
            'blog_id' => $blogId,
            'parent_id' => $request->input('parent_id'),
            'author' => $request->input('author'),
            'comment' => $request->input('comment'),
        ]);

        return redirect()->back();
    }

    /**
     * Dashboard Component
     */
    public function dashboardIndex() {
        $data = Blog::withCount('comments')->with('user')->paginate();

        return Inertia::render("Dashboard/Blog", ['blogs' => $data]);
    }

    public function dashboardCreate(Request $request) {
        if($request->isMethod('post')) {
            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'category' => 'required',
                'tag' => 'required',
                'thumbnail' => 'required|image|mimes:jpeg,png,jpg,bmp,svg|max:1024',
            ]);

            $content = $this->saveBase64Images($request->input('content'));
            $title = $request->input('title');
            $slug = preg_replace('/\s+/', '-', trim($title));
            $slug = strtolower($slug);
            $category = $request->input('category');
            $tag = $request->input('tag');
            $thumbnail = $request->file('thumbnail')->store("images", 'public');

            Blog::create([
                "slug" => $slug,
                "user_id" => auth()->id(),
                "title" => trim($title),
                "content" => $content,
                "category" => trim($category),
                "tags" => trim($tag),
                "thumbnail" => $thumbnail
            ]); 

            
            return redirect()->route('dashboard.blog')->with("success", "Berhasil Membuat blog");
            
        }
        $categories = Blog::categories();
        return Inertia::render("Dashboard/BlogCreate", ['category' => $categories]);
    }
    public function dashboardUpdate(string $id, Request $request) {

        if($request->isMethod('post')) {
            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'category' => 'required',
                'tag' => 'required',
            ]);

            if($request->hasFile('thumbnail')) {
                $request->validate([
                    'thumbnail' => 'required|image|mimes:jpeg,png,jpg,bmp,svg|max:1024',
                ]);

                $thumbnail = $request->file('thumbnail')->store("images", 'public');
            } else {
                $thumbnail = $request->input('thumbnail');
            }

            $content = $this->saveBase64Images($request->input('content'));
            $title = $request->input('title');
            $slug = preg_replace('/\s+/', '-', trim($title));
            $slug = strtolower($slug);
            $category = $request->input('category');
            $tag = $request->input('tag');

            

            $blog = Blog::findOrFail($id);
            $blog->slug = $slug;
            $blog->title = trim($title);
            $blog->content = $content;
            $blog->category = trim($category);
            $blog->tags = trim($tag);
            $blog->thumbnail = $thumbnail;

            if($blog->touch()) {
                return redirect()->route('dashboard.blog')->with("success", "Berhasil Memeperbarui blog");
            }
            return redirect()->route('dashboard.blog')->with("errors", "Gagal Memeperbarui");
        }
        
        $categories = Blog::categories();
        $blog = Blog::with('user')->where("id", "=", $id)->first();
        return Inertia::render("Dashboard/BlogUpdate", ['blog' => $blog, 'category' => $categories]);
    }



    private function saveBase64Images($content)
    {
        preg_match_all('/<img src="data:image\/(.*?);base64,(.*?)"/', $content, $matches);

        foreach ($matches[2] as $index => $base64Image) {
            $imageData = base64_decode($base64Image);
            $imageName = uniqid() . '.' . $matches[1][$index];
            $path = 'public/images/' . $imageName;

            // Simpan gambar ke storage
            Storage::put($path, $imageData);

            // Gantikan base64 dengan URL gambar yang disimpan
            $imageUrl = Storage::url($path);
            $content = str_replace($matches[0][$index], '<img src="' . $imageUrl . '"', $content);
        }

        return $content;
    }

    public function createCategory(Request $request) {
        $request->validate([
            "name" => "required"
        ]);

        $id = Blog::categories_create([
            "name" => $request->input("name")
        ]);

        return response()->json(["id" => $id]);
    }
}
