import Header from "@/components/Header";
import Table from "@/components/Table";
import { useGetTasksQuery } from "@/state/api";
import { Task as TaskType } from "@/state/api";
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
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Estimation",
    accessor: "estimation",
    className: "hidden md:table-cell",
  },
  {
    header: "Type",
    accessor: "type",
    className: "hidden lg:table-cell",
  },
  {
    header: "People",
    accessor: "people",
    className: "hidden lg:table-cell",
  },
  {
    header: "Priority",
    accessor: "priority",
  },
];

const renderRow = (task: TaskType) => (
  <tr
    className="hover:bg-purplelight cursor-pointer border-b border-gray-200 text-sm"
    key={task.id}
  >
    <td className="hidden md:table-cell">{task.title}</td>
    <td className="hidden md:table-cell">{task.description}</td>
    <td className="hidden md:table-cell"></td>
    <td className="hidden md:table-cell">{task.assignee?.username}</td>
    <td>{task.priority}</td>
  </tr>
);

const TaskCard = ({ status, tasks }: TaskProps) => {
  const tasksCount = tasks.filter((task) => task.status === status);

  const statusColor: any = {
    "To Do": "#3a86ff",
    "Work In Progress": "#f72585",
    "Under Review": "#007200",
    Completed: "#000000",
  };
  return (
    <div>
      <div className="mb-2 flex w-full rounded-md bg-gray-200 p-3">
        <div
          className="mr-2 rounded-md border-l-4 border-gray-400 shadow-md"
          style={{ backgroundColor: statusColor[status] }}
        />
        <span className="font-semibold">
          {status} ({tasksCount.length})
        </span>
      </div>
      <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
        <Table columns={columns} renderRow={renderRow} data={tasksCount} />
      </div>
    </div>
  );
};
export default ListView;
