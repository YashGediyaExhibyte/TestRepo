import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

interface Data {
  name: string;
  id: number;
}

const Practice = () => {
  const [data, setData] = useState<Data[]>([]);
  const [value, setValue] = useState<string>("");
  const [num, setNum] = useState<number | undefined>();
  const [addData, setAddData] = useState<Data | undefined>(undefined);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value.trim() !== "") {
      setData([...data, { name: value, id: new Date().getTime() }]);
      setValue("");
    }
  };

  const handleDelete = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleSetNum = (val: Data) => {
    setNum(val.id);
    setAddData(val);
  };

  const handleUpdateData = () => {
    if (addData) {
      const newData = data.map((item) =>
        item.id === addData.id ? { ...item, name: addData.name } : item
      );
      setData(newData);
      setNum(undefined);
      setAddData(undefined);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-[700px] w-full my-10 flex gap-4 items-center">
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 items-center w-full"
        >
          <div className="w-full">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="bg-slate-100 border-slate-200 border rounded-lg w-full px-5 py-3 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-7 w-max whitespace-nowrap bg-blue-500 text-white rounded-md"
          >
            Add Data
          </button>
        </form>
      </div>
      <div className="max-w-[400px] space-y-3 mx-auto w-full">
        {data.map((val, i) => (
          <div
            className="bg-slate-200 rounded-md px-5 py-3 font-semibold text-slate-600 flex justify-between items-center"
            key={i}
          >
            {val.id === num ? (
              <div className="gap-2 flex">
                <input
                  value={addData?.name}
                  onChange={(e) =>
                    setAddData({ ...addData, id: val.id, name: e.target.value })
                  }
                  type="text"
                  className="rounded-md focus:outline-none px-3"
                />
                <button className="border text-sm" onClick={handleUpdateData}>
                  Save
                </button>
              </div>
            ) : (
              <h3>{val.name}</h3>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => handleSetNum(val)}
                className="text-green-600 text-[18px]"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDelete(val.id)}
                className="text-red-600 text-[20px]"
              >
                <MdOutlineDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
