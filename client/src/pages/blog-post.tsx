import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white text-black min-h-screen font-dmsans">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white text-black min-h-screen font-dmsans">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-spectral mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/" className="inline-flex items-center text-black hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen font-dmsans">
      <Navigation />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-black hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-spectral font-normal mb-4">
                {post.title}
              </h1>
              <p className="text-gray-800 text-lg mb-4 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <time dateTime={post.date.toString()}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="text-gray-400">|</span>
                <div className="flex gap-1">
                  {post.tags.map((tag, index) => (
                    <span key={tag}>
                      {tag}
                      {index < post.tags.length - 1 && (
                        <span className="text-gray-400 ml-1">,</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </header>
            
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>

      <footer className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <div className="border-t border-black pt-8">
          <p className="text-sm text-gray-600">
            © 2024 Yvon Kim. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
