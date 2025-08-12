import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Shield, Facebook, Twitter, Linkedin } from 'lucide-react';

const SocialIcon = ({ href, children }) => (
  <a href={href} className="text-gray-400 hover:text-red-500 transition-colors duration-300">
    {children}
  </a>
);

export default function AppFooter() {
  const productLinks = [
    { name: 'How It Works', href: createPageUrl('FAQ') },
    { name: 'Analyze Listing', href: createPageUrl('Analyze') },
    { name: 'Book a Call', href: createPageUrl('WhatsNext') },
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: createPageUrl('WhatsNext') },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Logo and description */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-bold text-white text-xl">PropertyGuard</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The AI-powered platform trusted by Canadian homebuyers to instantly verify real estate listings, detect inconsistencies, and avoid costly scams.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialIcon href="#"><Facebook size={20} /></SocialIcon>
              <SocialIcon href="#"><Twitter size={20} /></SocialIcon>
              <SocialIcon href="#"><Linkedin size={20} /></SocialIcon>
            </div>
          </div>
          
          {/* Links sections */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} PropertyGuard Canada. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             <p className="text-xs text-gray-600">🍁 Built for Canadians</p>
          </div>
        </div>
      </div>
    </footer>
  );
}