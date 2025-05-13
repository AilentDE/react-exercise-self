"use client";

import { useState } from "react";
import { db } from "@/lib/db";

interface AddFriendFormProps {
  defaultAge: number;
}

const AddFriendForm = ({ defaultAge }: AddFriendFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(defaultAge);
  const [status, setStatus] = useState("");

  const addFriend = async () => {
    if (!name || !age) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      // Add the new friend!
      const id = await db.friends.add({
        name,
        age,
      });
      setStatus(`Friend ${name} successfully added. Got id ${id}`);

      setName("");
      setAge(defaultAge);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center justify-between">
        <p>Name:</p>
        <input
          className="border border-gray-300 rounded-md p-2 flex-1"
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div className="flex gap-4 items-center justify-between">
        <p>Age:</p>
        <input
          className="border border-gray-300 rounded-md p-2 w-1/4"
          type="number"
          value={age}
          onChange={(ev) => setAge(Number(ev.target.value))}
        />
      </div>

      <button
        className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors cursor-pointer"
        onClick={addFriend}
      >
        Add
      </button>
      <p
        className={`text-sm ${
          status.includes("successfully") ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </p>
    </div>
  );
};

export default AddFriendForm;
