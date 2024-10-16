import { ErrorListProps } from "@rjsf/utils";

function ErrorListTemplate(props: ErrorListProps) {
  const { errors } = props;

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200">
      <h2 className="text-lg font-semibold text-red-600">Error list</h2>
      <ul>
        {errors.map((error) => (
          <li
            className="text-red-900 px-3 py-2 text-sm"
            key={`${error.property}-${error.stack}`}
          >{`${error.name?.toUpperCase()} [${error.property}] - ${error.message}`}</li>
        ))}
      </ul>
    </div>
  );
}

export { ErrorListTemplate };
