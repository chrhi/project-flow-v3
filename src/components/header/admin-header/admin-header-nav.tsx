 /* eslint-disable */
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";

const tabs = [
    { name: "Tableau de bord", href: `/admin` },
    { name: "Utilisateurs", href: `/admin/users` },

   
]

export default function AdminNavTabs() {
  const router = useRouter();
 

  return (
    <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
      {tabs.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={`border-b-4 p-1 ${
            //@ts-ignore
            router.asPath.split("?")[0].split("/").slice(0, 3).join("/") ===
            href
              ? "border-blue-500 text-blue-500 font-semibold"
              : "border-transparent text-gray-600 hover:text-black"
          }`}
        >
          <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            <p className="text-sm">{name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
