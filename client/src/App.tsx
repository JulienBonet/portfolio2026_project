import { useEffect } from "react";

import { getProjects } from "@/api/projects.api";

export default function App() {

  useEffect(() => {
    async function load() {

      try {
        const projects =
          await getProjects();

        console.log(projects);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  return (
    <h1>
      Portfolio 2026
    </h1>
  );
}
