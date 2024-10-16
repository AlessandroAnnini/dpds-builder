import { FieldErrorProps } from "@rjsf/utils";
import { CircleAlert } from "lucide-react";

function FieldErrorTemplate(props: FieldErrorProps) {
  const { errors } = props;
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200">
      <div className="flex items-center mb-2">
        <CircleAlert className="h-5 w-5 text-red-500 mr-2" />
        <h3 className="text-red-800 font-semibold">Errors</h3>
      </div>
      <ul className="space-y-2">
        {errors.map((error, i) => (
          <li key={i} className="text-red-700  px-3 py-2 text-sm">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { FieldErrorTemplate };
