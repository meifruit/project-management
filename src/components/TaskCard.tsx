import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import Table from "./Table";

type TaskProps = {
  task: Task;
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

const renderRow = (item: Task) => (
  <tr className="hover:bg-purplelight cursor-pointer border-b border-gray-200 text-sm">
    <td className="hidden md:table-cell">{item.title}</td>
    <td className="hidden md:table-cell">{item.description}</td>
    <td className="hidden md:table-cell">{}</td>
    <td className="hidden md:table-cell">{item.assignee?.username}</td>
  </tr>
);
const TaskCard = ({ task }: TaskProps) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      <Table columns={columns} renderRow={renderRow} data={[task]} />
    </div>
  );
};

export default TaskCard;
