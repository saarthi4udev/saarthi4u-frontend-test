import EduLoader from "@/components/Common/EduLoader";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <EduLoader overlay={false} message="Loading your learning path…" />
    </div>
  );
}