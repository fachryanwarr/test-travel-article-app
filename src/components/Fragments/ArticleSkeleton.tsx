const ArticleSkeleton = () => {
  return (
    <div className="flex h-56 w-full rounded-xl overflow-hidden p-4 border border-bw-600 animate-pulse">
      <div className="h-full rounded-lg w-72 bg-bw-700 shrink-0"></div>

      <div className="px-6 flex flex-col gap-2 w-full">
        <div className="w-full h-5 bg-bw-700"></div>
        <div className="w-full h-5 bg-bw-700"></div>
        <div className="w-full h-5 bg-bw-700"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
