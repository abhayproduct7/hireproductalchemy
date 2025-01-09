import { Link } from "react-router-dom";
import { Globe, Link as LinkIcon, Mail, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/sections/contact-form/ContactForm";

export const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-accent">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </h3>
            <p className="mb-2">Need help? Get in touch with us.</p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center text-accent hover:text-accent/80">
                  Contact Form
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* SEO Optimized Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Global Reach
            </h3>
            <div className="flex items-start gap-2">
              <Search className="h-5 w-5 mt-1" />
              <p className="text-sm">
                Connecting top product management talent with innovative companies
                worldwide. Expert product managers ready to transform your vision
                into reality.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} ProductHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};