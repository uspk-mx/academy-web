import { CircleAlertIcon } from "lucide-react";

export const ErrorAlert = ({
  title,
  errors,
}: {
  title?: string;
  errors?: string[];
}) => {
  return (
    <div className="rounded-lg border border-[#ffeeef] bg-[#ffebeb] px-4 py-3 text-[#c30028] selection:bg-[#ea001d] selection:text-white">
      <div className="flex gap-3">
        <CircleAlertIcon
          className="mt-0.5 shrink-0 opacity-60"
          size={16}
          aria-hidden="true"
        />
        <div className="grow space-y-1">
          {title ? <p className="text-sm font-medium">{title}</p> : null}
          {errors && errors.length > 0 ? (
            <ul className="list-inside list-disc text-sm opacity-80">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};
