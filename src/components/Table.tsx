const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: {
    header: string;
    accessor: string;
    width: string;
    className?: string;
  }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="text-left text-sm font-semibold text-gray-500">
          {columns.map((col) => (
            <th
              key={col.accessor}
              className={`border-b border-gray-300 ${col.className || ""}`}
              style={{ width: col.width }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
