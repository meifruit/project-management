import Header from "@/components/Header";
import {
  ArrowUpDown,
  Clock,
  Filter,
  LayoutDashboard,
  List,
  Plus,
  Search,
  Table,
} from "lucide-react";
import { useState } from "react";
import ModalNewProject from "./ModalNewProject";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

//correct file name
const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
      {/* modal new project */}
      <div className="">
        <Header name={"Project Development"} />
      </div>
      <div className="flex flex-wrap-reverse border-b pb-4 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-4">
          <TabButton
            name={"Board"}
            icon={<LayoutDashboard className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name={"List"}
            icon={<List className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:justify-between">
        <div className="flex items-start gap-2 py-4 md:gap-4">
          <ModalNewProject
            isOpen={isModalNewProjectOpen}
            onClose={() => setIsModalNewProjectOpen(false)}
          />
          <button
            className="flex items-center justify-between gap-1 rounded-md bg-[#7678ed] p-3 text-white shadow-md hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setIsModalNewProjectOpen(true)}
          >
            <Plus className="h-5 w-5" />
            <span className="hidden md:inline">Add New Project</span>
          </button>
          <button className="flex items-center justify-between gap-1 rounded-md p-3 text-gray-400 shadow-md hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
            <span className="hidden md:inline">Filter</span>
          </button>
          <button className="flex items-center justify-between gap-1 rounded-md p-3 text-gray-400 shadow-md hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <ArrowUpDown className="h-5 w-5" />
            <span className="hidden md:inline">Sort By</span>
          </button>
        </div>
        <div className="relative flex">
          <Search className="absolute left-[6px] top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300" />
          <input
            type="text"
            className="flex items-center justify-between gap-1 rounded-md p-3 pl-8 pr-0 shadow-md focus:outline-none dark:bg-dark-secondary dark:text-white md:pr-2"
            placeholder="Search task"
          ></input>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};
const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`flex items-center justify-between gap-1 px-1 py-2 sm:px-2 lg:px-4 ${
        isActive
          ? "text-blue-600 dark:text-white"
          : "text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white"
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
