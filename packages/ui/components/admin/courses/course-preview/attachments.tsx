import { Paperclip } from "lucide-react";

interface AttachmentsProps {
  attachments: { name: string; url: string }[];
}

export function Attachments({ attachments }: AttachmentsProps) {
  if (attachments.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Attachments</h2>
      <ul className="space-y-2">
        {attachments.map((attachment, index) => (
          <li key={index}>
            <a
              href={attachment.url}
              download
              className="flex items-center text-blue-600 hover:underline"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              {attachment.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
