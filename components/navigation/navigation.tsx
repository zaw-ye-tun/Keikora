"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/product-data";
import { Logo } from "@/components/ui/logo";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // Keep the section where the visitor opened the menu selected until it closes.
    if (open) return;
    const sections = navigation.flatMap(([, href]) => {
      const node = document.getElementById(href.slice(1));
      return node ? [{ href, node }] : [];
    });
    let frame = 0;
    let previous = "";
    const update = () => {
      frame = 0;
      const line = (header.current?.getBoundingClientRect().height ?? 82) + 200;
      // Follow document position, including when navigation entries are ordered
      // differently from the workflow/product introduction on the page.
      const visible = sections
        .map((section) => ({ ...section, top: section.node.getBoundingClientRect().top }))
        .filter((section) => section.top <= line)
        .sort((a, b) => b.top - a.top)[0]?.href ?? "";
      if (visible !== previous) {
        previous = visible;
        setCurrent(visible);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    const main = document.getElementById("main");
    if (main) observer.observe(main);
    if (header.current) observer.observe(header.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  return (
    <header ref={header} className="site-header">
      <nav className="container nav" aria-label="Main navigation">
        <a href="#" aria-label="Keikora home">
          <Logo eager />
        </a>
        <div className="desktop-links">
          {navigation.map(([name, href]) => (
            <a key={name} href={href} aria-current={current === href ? "location" : undefined}>
              {name}
            </a>
          ))}
        </div>
        <a className="button button-small nav-cta" href="#contact">
          Contact Keikora <ArrowUpRight size={15} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div
          id="mobile-navigation"
          className="mobile-links"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {navigation.map(([name, href]) => (
            <a key={name} href={href} aria-current={current === href ? "location" : undefined} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact Keikora ↗
          </a>
        </div>
      )}
    </header>
  );
}
