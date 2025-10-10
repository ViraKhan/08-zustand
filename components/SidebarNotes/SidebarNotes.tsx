import Link from "next/link";
import { CATEGORIES } from "@/types/note";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {CATEGORIES.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link className={css.menuLink} href={`/notes/filter/${category}`}
            scroll={false}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}