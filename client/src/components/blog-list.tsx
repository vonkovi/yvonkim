import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogListProps {
  blogPosts: BlogPost[];
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
        <h2 className="text-xl font-spectral mb-4">Error Loading Blog Posts</h2>
        <p className="text-gray-600">
          There was an error loading the blog posts. Please try again later.
        </p>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-spectral mb-4">No Blog Posts Found</h2>
        <p className="text-gray-600">
          No blog posts are available at the moment. Add some .md files to the blog folder to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {blogPosts.map((post) => (
        <article key={post.slug} className="blog-post">
          <h2 className="text-2xl font-spectral font-normal mb-3">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-800 mb-2 leading-relaxed">
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
        </article>
      ))}
    </div>
  );
}
