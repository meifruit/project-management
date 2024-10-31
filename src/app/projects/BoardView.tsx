import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, Plus } from "lucide-react";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery(
    { projectId: Number(id) },
    { refetchOnMountOrArgChange: true },
  );
  // console.log("Project ID:", id);
  // console.log("Tasks:", tasks, "isLoading:", isLoading, "error:", error);

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  // useEffect(() => {
  //   // Direct fetch to test data retrieval
  //   fetch(`/api/tasks?projectId=${id}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log("Data from fetch:", data))
  //     .catch((err) => console.error("Fetch error:", err));
  // }, [id]);
  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };
  if (isLoading) return <div className="">Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks </div>;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: any = {
    "To Do": "#3a86ff",
    "Work In Progress": "#f72585",
    "Under Review": "#007200",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-lg py-2 xl:px-2 xl:py-4 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex justify-between rounded-md bg-white px-5 py-4 dark:bg-dark-secondary">
        <div className="flex items-center">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: statusColor[status] }}
          />
          <h3 className="flex items-center pl-4 text-lg font-semibold dark:text-white">
            {status}{" "}
          </h3>
          <span
            className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
            style={{ width: "1.5rem", height: "1.5rem" }}
          >
            {tasksCount}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center dark:text-neutral-500"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default BoardView;
