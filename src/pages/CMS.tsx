import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import CircularLoading from "../components/Elements/CircularLoading";
import Divider from "../components/Elements/Divider";
import AddCategoryModal from "../components/Fragments/AddCategoryModal";
import DeleteCategoryModal from "../components/Fragments/DeleteCategoryModal";
import PaginationControl from "../components/Fragments/Pagination";
import UpdateCategoryModal from "../components/Fragments/UpdateCategoryModal";
import withAuth from "../components/hoc/WithAuth";
import { formatDate } from "../lib/formater";
import sendRequest from "../lib/getApi";
import useAppStore from "../store/useAppStore";
import {
  Category,
  CategoryResponse,
  Pagination,
} from "../types/response/article";

const CMS = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [meta, setMeta] = useState<Pagination>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Category>();

  const [trigger, setTrigger] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const setLoading = useAppStore.useSetLoading();

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<CategoryResponse>(
        "GET",
        "/categories",
        null,
        {
          "pagination[pageSize]": 10,
          "pagination[page]": pageNumber,
          "sort[0]": "publishedAt:desc",
        }
      );

      if (isSuccess && data) {
        setCategories(data.data);
        setMeta(data.meta.pagination);
      }

      setLoading(false);
    };

    getCategories();
  }, [setLoading, pageNumber, trigger]);

  return (
    <main className="container py-5 md:py-10">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center gap-5 justify-between">
          <h4 className="h4 text-white font-bold">Category</h4>
          <div className="flex items-center gap-4">
            <Link
              to={"/cms/dashboard"}
              className="btn btn-md rounded-full btn-primary"
            >
              <MdOutlineSpaceDashboard />
              Show Dashboard
            </Link>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-md rounded-full btn-outline-primary"
            >
              Add Category
              <FaPlus />
            </button>
          </div>
        </div>
        <Divider />
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created at</th>
                <th>Last Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories ? (
                categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat.id}>
                      <td className="capitalize">{cat.name}</td>
                      <td>{formatDate(cat.createdAt)}</td>
                      <td>{formatDate(cat.updatedAt)}</td>
                      <td>
                        <div className="flex items-center justify-center gap-5">
                          <button
                            onClick={() => {
                              setShowUpdateModal(true);
                              setSelectedCat(cat);
                            }}
                            className="btn btn-sm btn-secondary"
                          >
                            <LuPencilLine />
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setShowDeleteModal(true);
                              setSelectedCat(cat);
                            }}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FaRegTrashCan />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>Tidak ada data</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={4}>
                    <CircularLoading />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {meta && categories && (
          <div className="w-fit self-center md:self-end">
            <PaginationControl
              pageNumber={meta.page}
              lastPage={meta.pageCount}
              total={meta.total}
              setPageNumber={setPageNumber}
              showing={categories.length}
            />
          </div>
        )}
      </div>
      {showCreateModal && (
        <AddCategoryModal
          setShowModal={setShowCreateModal}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      )}
      {showUpdateModal && selectedCat && (
        <UpdateCategoryModal
          setShowModal={setShowUpdateModal}
          setTrigger={setTrigger}
          trigger={trigger}
          cat={selectedCat}
        />
      )}
      {showDeleteModal && selectedCat && (
        <DeleteCategoryModal
          setShowModal={setShowDeleteModal}
          setTrigger={setTrigger}
          trigger={trigger}
          cat={selectedCat}
        />
      )}
    </main>
  );
};

export default withAuth(CMS, true);
