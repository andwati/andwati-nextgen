import { NavLink } from "@/components/NavLink";
import { site } from "@/lib/site";

const link = "mt-2 block w-fit text-[18px] leading-[27px]";

export function Sidebar() {
  return (
    <aside className="absolute right-full mr-40 hidden lg:flex">
      <div className="fixed flex flex-col items-start whitespace-nowrap">
        <nav>
          <p className="text-[13.3333px] leading-5 font-bold">NAVIGATION</p>
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} className={link}>
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-10">
          <p className="text-[13.3333px] leading-5 font-bold">FIND ME ON</p>
          {site.social.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link} text-gray-500 hover:text-black`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
