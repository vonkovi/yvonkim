import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { insertBlogPostSchema } from "@shared/schema";

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog post routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      // First, sync with file system
      await syncBlogPosts();
      
      const tag = req.query.tag as string;
      let posts;
      
      if (tag && tag !== 'all') {
        posts = await storage.getBlogPostsByTag(tag);
      } else {
        posts = await storage.getAllBlogPosts();
      }
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      // First, sync with file system
      await syncBlogPosts();
      
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Sync blog posts from file system
  async function syncBlogPosts() {
    const blogDir = path.join(process.cwd(), "blog");
    
    // Create blog directory if it doesn't exist
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
      return;
    }
    
    try {
      const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        // Generate slug from filename if not provided
        const slug = data.slug || file.replace('.md', '');
        
        // Parse and validate frontmatter
        const blogPost = {
          title: data.title || 'Untitled',
          description: data.description || '',
          content: marked(content),
          slug,
          tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
          date: data.date ? new Date(data.date) : new Date(),
          filename: file,
        };
        
        // Validate the blog post data
        const validatedPost = insertBlogPostSchema.parse(blogPost);
        
        // Check if post already exists
        const existingPost = await storage.getBlogPostBySlug(slug);
        if (existingPost) {
          // Update existing post
          await storage.updateBlogPost(slug, validatedPost);
        } else {
          // Create new post
          await storage.createBlogPost(validatedPost);
        }
      }
    } catch (error) {
      console.error("Error syncing blog posts:", error);
    }
  }

  const httpServer = createServer(app);
  return httpServer;
}
