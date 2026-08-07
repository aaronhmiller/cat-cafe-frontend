import type { ComponentChildren } from "preact";

export function Layout({ children }: { children: ComponentChildren }) {
  return (
    <>
      <header class="site-header">
        <a class="brand" href="/">🐈 Cat Cafe</a>
        <nav>
          <a href="/reservations">My reservations</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Quiet company, kind cats, and complimentary herbal tea.</footer>
    </>
  );
}
