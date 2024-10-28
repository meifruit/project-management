"use client";
import { useState } from "react";
import ProjectHeader from "../projectHeader";

type Props = {
  params: { id: string }; // params is parameter
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <div>
      {/* modal new task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Project;
