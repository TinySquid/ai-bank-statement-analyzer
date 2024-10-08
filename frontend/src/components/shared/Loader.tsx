import React from "react";
import Spinner from "./Spinner";

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Spinner className="w-10 h-10" />
      <h1 className="text-xl">{text}</h1>
    </div>
  );
};

export default Loader;
