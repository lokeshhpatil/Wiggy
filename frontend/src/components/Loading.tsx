const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="flex gap-1">
        <div className="h-3 w-3 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 animate-bounce rounded-full bg-orange-500"></div>
      </div>
      <p className="text-sm font-medium text-gray-500">Loading...</p>
    </div>
  );
};

export default Loading;
