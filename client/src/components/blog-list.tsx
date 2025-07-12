import { Link } from "wouter";
// Assumes the BlogPost type now includes an optional 'tags' array
import type { BlogPost } from "@shared/schema";

interface BlogListProps {
  // The BlogPost type should include an optional array of strings for tags
  blogPosts: (BlogPost & { tags?: string[] })[];
  isLoading: boolean;
  error: Error | null;
}

export function BlogList({ blogPosts, isLoading, error }: BlogListProps) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-12">
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogPosts.map((post) => (
        <article key={post.slug} className="blog-post">
          <h2 className="text-lg font-spectral font-normal -mb-1">
            <Link href={`/blog/${post.slug}`} className="hover:opacity-70  transition-opacity">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-2 leading-relaxed text-sm">
            {post.description}
          </p>
          <div className="text-xs text-gray-500 pb-6 border-b-[1px] border-gray-200">
            {/* Date formatting remains the same */}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            
            {/* Conditionally render tags if they exist */}
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="mx-2">|</span>
                <span>{post.tags.join(", ")}</span>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}