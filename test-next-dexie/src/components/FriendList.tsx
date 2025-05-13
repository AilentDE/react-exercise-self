"use client";

import { useSearchParams } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

interface FriendQueryProps {
  defaultMinAge: number;
  defaultMaxAge: number;
}

const FriendList = ({ defaultMinAge, defaultMaxAge }: FriendQueryProps) => {
  const searchParams = useSearchParams();
  const minAge = searchParams.get("minAge") || defaultMinAge;
  const maxAge = searchParams.get("maxAge") || defaultMaxAge;

  const friends = useLiveQuery(async () => {
    //
    // Query Dexie's API
    //
    const friends = await db.friends
      .where("age")
      .between(+minAge, +maxAge)
      .toArray();

    return friends;
  }, [minAge, maxAge]);

  return (
    <ul className="flex flex-col gap-2">
      {friends?.map((friend) => (
        <li key={friend.id} className="flex gap-4 items-center justify-center">
          <p>{friend.name}</p>
          <p>{friend.age}</p>
        </li>
      ))}
    </ul>
  );
};

export default FriendList;
