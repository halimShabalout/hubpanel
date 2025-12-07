import { Modal } from "@/components/ui/modal";
import { motion } from "framer-motion";
import { ContactRequest } from "@/types/ContactRequest";
import { useLocale } from "@/context/LocaleContext";

import {
  UserCircleIcon,
  CalenderIcon,
  ChatIcon,
  PhoneIcon,
  MailIcon,
} from "@/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactRequest | null;
}

/* -----------------------------------------------------------
 *  Status Helpers
 * ----------------------------------------------------------- */

const statusColors: Record<string, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  in_progress:
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  completed:
    "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

const getStatusLabel = (status: string | undefined, messages: any) => {
  if (!status) return "N/A";

  switch (status) {
    case "pending":
      return messages["status_pending"] || "Pending";
    case "in_progress":
      return messages["status_in_progress"] || "In Progress";
    case "completed":
      return messages["status_completed"] || "Completed";
    default:
      return status;
  }
};

/* -----------------------------------------------------------
 *  Main Component
 * ----------------------------------------------------------- */

export default function ShowModal({ isOpen, onClose, contact }: Props) {
  const { messages } = useLocale();

  const dateValue = contact?.createdAt
    ? new Date(contact.createdAt).toLocaleDateString()
    : "N/A";

  const statusLabel = getStatusLabel(contact?.status, messages);
  const statusStyle = statusColors[contact?.status || "pending"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-0">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {/* -------- Header -------- */}
        <div className="text-center border-b border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
          <h4 className=" text-2xl font-bold text-gray-900 dark:text-white">
            {messages["contact_requests"] || "Contact Request"}
          </h4>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">{messages["contact_id"] || "Request ID"} :</span>{" "}
            <span>{contact?.id || "N/A"}</span>
          </div>
        </div>
        {/* -------- Content -------- */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
            {/* Date */}
            <div className="flex items-center gap-2">
              <CalenderIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{dateValue}</span>
            </div>
            {/* Status */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle}`}
            >
              {statusLabel}
            </span>
          </div>
          {/* Name */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <UserCircleIcon className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {contact?.name || "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm">
              <MailIcon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{messages["email"] || "Emal"}</p>
                <p className="text-gray-900 dark:text-gray-200 font-medium">
                  {contact?.email || "N/A"}
                </p>
              </div>
            </div>
            {/* Phone */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm">
              <PhoneIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{messages["phone"] || "Phone Number"}</p>
                <p className="text-gray-900 dark:text-gray-200 font-medium">
                  {contact?.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Message */}
          <div className="flex items-start gap-3">
            <ChatIcon className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {messages["contact_message"] || "Message"}
              </h3>
              <p className="text-gray-900 dark:text-gray-200 mt-2 whitespace-pre-line leading-relaxed bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                {contact?.message || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
