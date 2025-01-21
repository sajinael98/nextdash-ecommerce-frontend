import React from "react";

const asds = () => {
  return (
    <thead>
      {table.getLeftHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} colSpan={header.colSpan}>
              <div className="whitespace-nowrap">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
              {!header.isPlaceholder && header.column.getCanPin() && (
                <div className="flex gap-1 justify-center">
                  {header.column.getIsPinned() !== "left" ? (
                    <button
                      className="border rounded px-2"
                      onClick={() => {
                        header.column.pin("left");
                      }}
                    >
                      {"<="}
                    </button>
                  ) : null}
                  {header.column.getIsPinned() ? (
                    <button
                      className="border rounded px-2"
                      onClick={() => {
                        header.column.pin(false);
                      }}
                    >
                      X
                    </button>
                  ) : null}
                  {header.column.getIsPinned() !== "right" ? (
                    <button
                      className="border rounded px-2"
                      onClick={() => {
                        header.column.pin("right");
                      }}
                    >
                      {"=>"}
                    </button>
                  ) : null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default asds;
