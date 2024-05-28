import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex justify-center mt-36 py-8 text-muted-foreground">
      <p>Copyright © 2024, Leopold Jurić</p>{" "}
      <a href="https://github.com/JuricLeo" target="_blank">
        <Github className="ml-2 text-primary/70 hover:text-primary/50" />
      </a>
    </footer>
  );
}
