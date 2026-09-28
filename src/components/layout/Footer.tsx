import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Browse",
    links: ["Featured Courses", "Featured Categories", "Business", "IT", "Design"],
  },
  {
    title: null,
    links: ["Development", "Marketing", "Photography", "Finance", "Sport"],
  },
  {
    title: "Platform",
    links: ["Become a Creator", "Affiliate Program", "Contact", "Help", "About"],
  },
];

const legal = ["Privacy Policy", "Terms of Service", "Cookies Settings"];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-page pt-[70px] pb-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[92px]">
          <div className="flex w-full max-w-[528px] flex-col gap-[45px]">
            <div className="flex flex-col gap-4">
              <Logo tone="dark" />
              <p className="type-body-s text-gray-950">
                Stay Up to date with our latest features and releases by joining our newsletter.
              </p>
            </div>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:w-[580px] lg:grid-cols-[167px_167px_1fr]">
            {columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-6">
                {col.title ? (
                  <h2 className="type-body-m leading-6 text-gray-400">{col.title}</h2>
                ) : (
                  <span aria-hidden className="hidden h-6 sm:block" />
                )}
                <ul className="flex flex-col gap-4">
                  {col.links.map((label) => (
                    <li key={label}>
                      <Link href="/courses" className="block type-body-s text-gray-950 hover:text-blue-800">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[130px] flex flex-col gap-[22px] border-t border-gray-200 pt-[22px] sm:flex-row sm:items-start sm:justify-between">
          <p className="type-body-xs leading-[19px] text-gray-950">@ 2023 ByteSpace. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            {legal.map((label) => (
              <li key={label}>
                <Link href="/" className="block type-body-xs leading-[19px] text-gray-950 underline hover:text-blue-800">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
