export interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-6">
      <div className="w-full max-w-lg bg-gray-900 text-white flex flex-col px-8 py-8 rounded-lg">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-gray-400">{message}</p>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              type="button"
              className="w-full bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
