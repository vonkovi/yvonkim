import { Navigation } from "@/components/navigation";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Portfolio() {
  return (
    <div className="bg-white text-black min-h-screen font-dmsans">
      <Navigation />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-black hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-spectral font-normal mb-8">Portfolio</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 leading-relaxed mb-6">
              This is where you can showcase your work, projects, and achievements. 
              Update this page with your own content.
            </p>
            
            <h2 className="text-2xl font-spectral font-normal mt-8 mb-4">Projects</h2>
            <p className="text-gray-600 mb-4">
              Add your projects here...
            </p>
            
            <h2 className="text-2xl font-spectral font-normal mt-8 mb-4">Experience</h2>
            <p className="text-gray-600 mb-4">
              Add your experience here...
            </p>
            
            <h2 className="text-2xl font-spectral font-normal mt-8 mb-4">Skills</h2>
            <p className="text-gray-600 mb-4">
              Add your skills here...
            </p>
          </div>
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
