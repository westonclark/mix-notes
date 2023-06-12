export const LoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-2">
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-scampi-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <span className="">Loading...</span>
    </div>
  );
};
