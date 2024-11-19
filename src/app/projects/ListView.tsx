import Header from "@/components/Header";
import Table from "@/components/Table";
import { useGetTasksQuery } from "@/state/api";
import { Task as TaskType } from "@/state/api";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type ListProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const ListView = ({ id, setIsModalNewTaskOpen }: ListProps) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div className="">Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks </div>;
  return (
    <div className="px-4 pb-8 xl:px-6">
      {/* <div className="pt-5">
        <Header name="List" />
      </div> */}
      <div className="">
        {taskStatus?.map((status) => (
          <TaskCard
            key={status}
            tasks={tasks || []}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};

type TaskProps = {
  status: string;
  tasks: TaskType[];
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns = [
  {
    header: "Task Name",
    accessor: "taskname",
    width: "20%",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
    width: "30%",
  },
  {
    header: "Estimation",
    accessor: "estimation",
    width: "25% ",
  },
  // {
  //   header: "Type",
  //   accessor: "type",
  //   className: "hidden lg:table-cell",
  // },
  {
    header: "People",
    accessor: "people",
    className: "hidden md:table-cell",
    width: "15%",
  },
  {
    header: "Priority",
    accessor: "priority",
    width: "10%",
  },
];

const renderRow = (task: TaskType) => {
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`flex max-w-fit items-center justify-start rounded-md px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );
  const rowClasses =
    "cursor-pointer border-b border-gray-200 text-sm hover:bg-[#bde0fe]";
  const cellClasses = "py-2 border-l pl-2 font-bold text-gray-700";
  return (
    <tr className={rowClasses} key={task.id}>
      <td className={cellClasses}>{task.title}</td>
      <td className={`hidden md:table-cell ${cellClasses}`}>
        {task.description}
      </td>
      <td className={cellClasses}>
        {formattedStartDate && <span>{formattedStartDate} - </span>}
        {formattedDueDate && <span>{formattedDueDate}</span>}
      </td>
      <td className={`hidden md:table-cell ${cellClasses}`}>
        <div className="flex -space-x-[6px] overflow-hidden">
          {task.assignee && (
            <Image
              key={task.assignee.userId}
              src={`/${task.assignee.profilePictureUrl}`}
              alt={task.assignee.username}
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
            />
          )}
          {task.author && (
            <Image
              key={task.author.userId}
              alt={task.author.username}
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              src={`/${task.author.profilePictureUrl}`}
            />
          )}
        </div>
      </td>
      <td className={cellClasses}>
        {" "}
        {task.priority && <PriorityTag priority={task.priority} />}
      </td>
    </tr>
  );
};

const TaskCard = ({ status, tasks }: TaskProps) => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const toggleTableVisibility = () => {
    setIsTableVisible((prev) => !prev);
  };
  const tasksCount = tasks.filter((task) => task.status === status);

  const statusColor: any = {
    "To Do": "#3a86ff",
    "Work In Progress": "#f72585",
    "Under Review": "#007200",
    Completed: "#000000",
  };
  const color = statusColor[status] || "#CCCCCC";
  return (
    <div>
      <div className="mb-1 flex w-full items-center rounded-md bg-gray-200 p-3">
        <div className="flex items-center">
          {isTableVisible ? (
            <ChevronDown
              className="mr-2 cursor-pointer"
              onClick={toggleTableVisibility}
              size={20}
              strokeWidth={2.5}
              color="#7d7d7d"
            />
          ) : (
            <ChevronUp
              className="mr-2 cursor-pointer"
              onClick={toggleTableVisibility}
              size={20}
              strokeWidth={2.5}
              color="#7d7d7d"
            />
          )}
          <div
            className="h-5 w-2 rounded-md shadow-md"
            style={{ backgroundColor: color }}
          />
          <h3 className="flex items-center pl-4 text-lg font-semibold dark:text-white">
            {status} ({tasksCount.length})
          </h3>
        </div>
      </div>
      {isTableVisible && (
        <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
          <Table columns={columns} renderRow={renderRow} data={tasksCount} />
        </div>
      )}
    </div>
  );
};
export default ListView;
