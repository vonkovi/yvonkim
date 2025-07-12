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
      <div className="bg-white text-black min-h-screen font-inter">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white text-black min-h-screen font-inter">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-xl font-spectral mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 text-sm mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/" className="text-black hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen font-inter">
      <Navigation />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-xs text-gray-600 hover:text-black hover:underline mb-8 inline-block">
            ← Back
          </Link>
          
          <article>
            <header className="mb-8">
              <h1 className="text-2xl font-spectral font-normal mb-3">
                {post.title}
              </h1>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {post.description}
              </p>
              <div className="text-xs text-gray-500 mb-6">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </header>
            
            <div 
              className="blog-content text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </div>
  );
}
