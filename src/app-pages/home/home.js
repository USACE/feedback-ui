import React, { useEffect, useState } from "react";
import Navbar from "../../app-components/navbar";
import Spinner from "../../app-components/spinner";

const ProjectList = (props) => {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetch("https://api.rsgis.dev/development/workplan/feedback/projects")
      .then((resp) => resp.json())
      .then((j) => {
        console.log(j);
        setProjects(j);
        setIsFetching(false);
      });
  }, []);

  return (
    <div class="flex flex-col mb-4">
      <h1 className="text-2xl">Projects</h1>
      {isFetching ? (
        <Spinner />
      ) : (
        <div>
          {projects.map((p) => (
            <div>{p.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};
export default () => (
  <main>
    <Navbar />
    <div className="container mx-auto mt-2">
      <ProjectList />
    </div>
  </main>
);
