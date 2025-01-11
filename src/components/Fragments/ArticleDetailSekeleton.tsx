import Divider from "../Elements/Divider";

const ArticleDetailSkeleton = () => {
  return (
    <div className="animate-pulse mt-5">
      <div className="h-10 bg-bw-700 w-[60%] rounded-lg"></div>
      <Divider className="mt-4 bg-bw-700" />
      <section className="grid grid-cols-5 mt-5">
        <div className="col-span-3 flex flex-col gap-5">
          <div className="h-72 w-full bg-bw-700 rounded-lg"></div>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="w-full h-4 bg-bw-700 rounded-xl"></div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleDetailSkeleton;
