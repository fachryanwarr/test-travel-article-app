import { Dispatch, SetStateAction } from "react";
import { GrFormPrevious } from "react-icons/gr";
import {
  MdNavigateNext,
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
} from "react-icons/md";

const PaginationControl = ({
  pageNumber,
  setPageNumber,
  lastPage,
  total,
  showing,
}: {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  lastPage: number;
  total: number;
  showing: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <p className="p3 text-white mr-3">
        Showing {showing} out of {total}
      </p>
      <button
        className="rounded-lg text-xl text-white btn p-1 w-7 h-7 btn-outline-primary"
        onClick={() => setPageNumber(1)}
        disabled={pageNumber == 1}
      >
        <MdOutlineSkipPrevious />
      </button>
      <button
        className="rounded-lg text-xl text-white btn p-1 w-7 h-7 btn-outline-primary"
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber == 1}
      >
        <GrFormPrevious />
      </button>
      <button className="rounded-lg text-white btn-primary btn p-1 w-8 h-8 pointer-events-none">
        {pageNumber}
      </button>
      <button
        className="rounded-lg text-xl text-white btn p-1 w-7 h-7 btn-outline-primary"
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber == 1}
      >
        <MdNavigateNext />
      </button>
      <button
        className="rounded-lg text-xl text-white btn p-1 w-7 h-7 btn-outline-primary"
        onClick={() => setPageNumber(lastPage)}
        disabled={pageNumber == lastPage}
      >
        <MdOutlineSkipNext />
      </button>
    </div>
  );
};

export default PaginationControl;
