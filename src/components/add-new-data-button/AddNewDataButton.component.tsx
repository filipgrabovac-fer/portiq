export type AddNewDataButtonProps = {
  onClick: () => void;
};

export const AddNewDataButton = ({ onClick }: AddNewDataButtonProps) => {
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-b-md w-full hover:opacity-90  duration-300 cursor-pointer"
      onClick={onClick}
    >
      + Add New Data
    </button>
  );
};
