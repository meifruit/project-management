import Header from "@/components/Header";
import {
  Clock,
  LayoutDashboard,
  LayoutDashboardIcon,
  List,
  Table,
} from "lucide-react";
import { useState } from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const projectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
      {/* modal new project */}
      <div className="">
        <Header name={"Product Design Development"} />
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
      className="flex items-center justify-between gap-1 px-1 py-2 text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4"
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default projectHeader;