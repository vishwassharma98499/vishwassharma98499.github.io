export function smoothScrollTo(href: string) {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(href);
  if (el) {
    const nav = document.getElementById("navbar");
    const navHeight = nav ? nav.offsetHeight : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
