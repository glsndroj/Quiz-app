import { QuizIcon } from "@/icons/icons";

export default function Result() {
  return (
    <div className="flex justify-center p-5">
      <div className="flex flex-col border rounded-md w-full max-w-[1000px] p-5 gap-3 bg-white shadow-lg">
        <div className="flex items-center gap-5 border-b pb-3">
          <QuizIcon />
          <h1 className="text-2xl font-bold text-gray-800">Quiz completed</h1>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-gray-600">Let's see what you did</h2>
        </div>

        <div className="border p-4 rounded-md bg-gray-50 w-[800px] h-fit"></div>
      </div>
    </div>
  );
}
