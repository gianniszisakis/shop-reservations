export const appointmentStatusMap = {
  CONFIRMED: {
    label: "Επιβεβαιωμένο",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  COMPLETED: {
    label: "Ολοκληρωμένο",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  CANCELLED: {
    label: "Ακυρωμένο",
    className: "bg-red-100 text-red-700 border-red-200",
  },
} as const;
