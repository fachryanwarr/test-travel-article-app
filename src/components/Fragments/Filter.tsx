import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import clsxm from "../../lib/clsxm";
import { Category } from "../../types/response/article";
import Divider from "../Elements/Divider";
import Input from "../Elements/Input";

const Filter = ({
  categories,
  setKeyword,
  setSelectedCat,
  selectedCat,
  keyword,
}: {
  categories?: Category[];
  setKeyword: Dispatch<SetStateAction<string>>;
  setSelectedCat: Dispatch<SetStateAction<Category | undefined>>;
  selectedCat: Category | undefined;
  keyword: string;
}) => {
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setShowFilterMobile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const methods = useForm<{ search: string }>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<{ search: string }> = async (formData) => {
    setKeyword(formData.search);
  };

  return (
    <div className="w-full">
      {showFilterMobile && (
        <div className="fixed w-full h-screen top-0 left-0 bg-dark-surface bg-opacity-50 z-10 lg:hidden"></div>
      )}
      <div
        ref={filterRef}
        className={clsxm(
          "w-full flex flex-col gap-4",
          showFilterMobile
            ? "flex max-md:fixed max-md:z-20 max-md:bg-dark-secondary max-md:h-[60vh] max-md:w-full bottom-0 left-0 max-md:p-5 max-md:rounded-t-3xl max-md:overflow-y-auto"
            : "hidden md:flex"
        )}
      >
        <div className="flex items-center justify-between">
          <h5 className="text-xl text-white font-bold">
            <CiFilter className="inline mr-1" />
            Filter
          </h5>
          {(selectedCat || keyword) && (
            <button
              onClick={() => {
                setSelectedCat(undefined);
                setKeyword("");
                methods.reset();
                setShowFilterMobile(false);
              }}
              className="btn btn-sm btn-primary rounded-full text-[12px]"
            >
              Reset
              <RiCloseLine />
            </button>
          )}
        </div>
        <Divider className="bg-bw-100" />
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 items-center flex-nowrap"
          >
            <div className="w-full shrink">
              <Input
                id="search"
                type="search"
                placeholder="Find article.."
                className="rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="btn btn-icon btn-primary h-full max-md:min-h-10 text-xl"
            >
              <IoSearchOutline />
            </button>
          </form>
        </FormProvider>
        <p className="text-white font-semibold">Category</p>
        <div className="flex flex-col gap-3">
          {categories?.map((cat) => (
            <div
              onClick={() => setSelectedCat(cat)}
              key={cat.id}
              className={clsxm(
                "flex items-center capitalize w-full py-1 px-3 border rounded-lg",
                "hover:md:border-blue-400 hover:md:bg-gradient-to-br hover:from-blue-500 hover:via-blue-600 hover:to-blue-700",
                "hover:md:text-white hover:md:font-medium",
                cat.id === selectedCat?.id
                  ? "border-blue-400 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white font-medium"
                  : "text-bw-200 border-bw-200 cursor-pointer"
              )}
            >
              {cat.id === selectedCat?.id ? (
                <MdRadioButtonChecked className="mr-2" />
              ) : (
                <MdRadioButtonUnchecked className="mr-2" />
              )}
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {!showFilterMobile && (
        <button
          onClick={() => setShowFilterMobile(true)}
          className="btn btn-md btn-white rounded-full fixed bottom-10 left-1/2 -translate-x-1/2 z-10 md:hidden shadow-lg"
        >
          <CiFilter />
          Filter
        </button>
      )}
    </div>
  );
};

export default Filter;
