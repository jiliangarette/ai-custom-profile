import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t rounded-md">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/page/about"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/page/careers"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/page/blog"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/page/press"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/page/documentation"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/page/help"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/page/guides"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/page/privacy"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/page/terms"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/page/cookies"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/page/licenses"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/page/contact"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/page/support"
                  className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} JGRT, Inc. All rights reserved.
              </span>
            </div>

            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary line-through pointer-events-none">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/jiliangarette/ai-custom-profile"
                className="text-slate-700 hover:text-primary ">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
