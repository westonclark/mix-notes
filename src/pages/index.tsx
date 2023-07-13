// Module Imports
import Image from "next/image";
import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

// Component and Asset Imports
import { Header } from "~/components/header";
import addfolder from "~/assets/add-folder.png";

// Types
import type { NextPage } from "next";
import ProjectList, { CreateProject } from "~/components/projects";

// Main Component
const Home: NextPage = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <>
      <Header />
      <main className="flex justify-center">
        <SignedOut>
          <h1 className="pt-48 text-4xl">MIX NOTES</h1>
        </SignedOut>
        <SignedIn>
          {/* Main container */}
          <div className="w-full p-4 pt-8 md:max-w-5xl">
            {/* Title and Add Project Button */}
            <div className="flex justify-between align-middle">
              <h1 className=" text-2xl">Projects</h1>
              <button
                className="w-30 flex items-center justify-center gap-2 rounded border border-scampi-600 bg-scampi-950 p-2 outline-none transition duration-500 ease-out hover:bg-scampi-900"
                onClick={() => setShowCreateProject(!showCreateProject)}
              >
                <Image
                  src={addfolder}
                  height={20}
                  width={20}
                  alt="add folder picture"
                />
                <span>New Project</span>
              </button>
            </div>
            <hr className="mb-2 mt-4 border-scampi-300"></hr>
            <ProjectList />
          </div>
          {showCreateProject && (
            <CreateProject
              showCreateProject={showCreateProject}
              setShowCreateProject={setShowCreateProject}
            />
          )}
        </SignedIn>
      </main>
    </>
  );
};

export default Home;
