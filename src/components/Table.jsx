import React from "react";

const Table = ({ data, onDataChange, onEditColumnTitle }) => {
  const handleCellChange = (e, rowIndex, cellIndex) => {
    const newData = [...data];
    newData[rowIndex][cellIndex] = e.target.value;
    onDataChange(newData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-blue-800">
        <thead>
          <tr>
            {data[0].map((header, index) => (
              <th key={index} className="border border-blue-600 px-4 py-2">
                <input
                  type="text"
                  value={header}
                  onChange={(e) => onEditColumnTitle(index, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-blue-600 px-4 py-2"
                >
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(e, rowIndex + 1, cellIndex)
                    }
                    className="w-full"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
