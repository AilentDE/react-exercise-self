import SectionCard from "@/components/SectionCard";
import FriendList from "@/components/FriendList";
import AddFriendForm from "@/components/AddFriend";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full px-8 justify-center">
        <h1 className="text-4xl font-bold text-center mx-auto uppercase">
          My simple Dexie sample
        </h1>

        <SectionCard
          title="Add Friend"
          description="This is a simple example of using Dexie with Next.js. You can add friends and see them in the list below."
        >
          <AddFriendForm defaultAge={21} />
        </SectionCard>

        <SectionCard title="Friend List">
          <Suspense fallback={<div>Loading...</div>}>
            <FriendList defaultMinAge={18} defaultMaxAge={65} />
          </Suspense>
        </SectionCard>
      </main>
    </div>
  );
}
