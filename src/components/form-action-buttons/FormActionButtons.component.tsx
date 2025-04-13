export type FormActionButtonsProps = {
  onDiscard: () => void;
  onSave: () => void;
};

export const FormActionButtons = ({
  onDiscard,
  onSave,
}: FormActionButtonsProps) => {
  return (
    <div className="flex gap-2 mt-4 justify-center">
      <button
        className="text-red-500 border border-red-500 p-1 rounded-md w-20 hover:opacity-90  duration-300 cursor-pointer"
        onClick={onDiscard}
      >
        Discard
      </button>
      <button
        className="bg-button_blue text-white p-1 rounded-md w-20 hover:opacity-90  duration-300 cursor-pointer"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};
