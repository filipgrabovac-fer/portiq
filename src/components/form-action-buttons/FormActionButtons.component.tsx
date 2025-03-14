export type FormActionButtonsProps = {
  onDiscard: () => void;
  onSave: () => void;
};

export const FormActionButtons = ({
  onDiscard,
  onSave,
}: FormActionButtonsProps) => {
  return (
    <div className="flex gap-4 mt-4 justify-center">
      <button
        className="text-red-500 border border-red-500 p-2 rounded-md w-40 hover:opacity-90  duration-300 cursor-pointer"
        onClick={onDiscard}
      >
        Discard
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md w-40 hover:opacity-90  duration-300 cursor-pointer"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};
