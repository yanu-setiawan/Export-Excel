import React, { useState } from "react";
import Table from "./components/Table";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const App = () => {
  const initialData = [
    ["Nama Barang", "Stock", "Harga"],
    ["Buku", 30, 30000],
    ["Pensil", 25, 40000],
    ["Penggaris", 35, 50000],
  ];

  const [data, setData] = useState(initialData);

  const handleChangeHeader = (e) => {
    setData({});
  };

  const handleAddRow = () => {
    setData([...data, ["", "", ""]]);
  };

  const handleEditColumnTitle = (index, newTitle) => {
    const newData = [...data];
    newData[0][index] = newTitle;
    setData(newData);
    // }
  };

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;
    const blob = new Blob([buf], { type: "application/octet-stream" });
    saveAs(blob, "dataBarang.xlsx");
  };

  return (
    <div className="container m-16">
      <h1 className="text-2xl font-bold mb-3">Export Data to Excel</h1>

      <Table
        data={data}
        onDataChange={handleDataChange}
        onEditColumnTitle={handleEditColumnTitle}
      />
      <div className="mt-5">
        <button
          onClick={handleAddRow}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
        >
          Add Row
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default App;
