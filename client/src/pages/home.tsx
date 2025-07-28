import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { TagFilter } from "@/components/tag-filter";
import { BlogList } from "@/components/blog-list";
import type { BlogPost } from "@shared/schema";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", selectedTag],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts?tag=${selectedTag}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      return response.json();
    },
  });

  return (
    <div className="bg-white text-black min-h-screen font-inter">
      <Navigation />
      
      <main className="max-w-2xl mr-auto ml-36 px-4 sm:px-6 lg:px-8">
        <TagFilter 
          selectedTag={selectedTag} 
          onTagChange={setSelectedTag}
        />
        
        <BlogList 
          blogPosts={blogPosts || []}
          isLoading={isLoading}
          error={error}
        />
      </main>

      <footer className="max-w-2xl mr-auto ml-36 px-4 sm:px-6 lg:px-8 mb-10">
        <div className=" pt-8">
          <p className="text-xs text-gray-600">
            © 2024 Yvon Kim. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
