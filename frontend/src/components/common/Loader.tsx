import { FC } from "react";
import { Hourglass } from "react-loader-spinner";

interface LoaderProps {
  visible?: boolean;
  height?: string;
  width?: string;
  wrapperClass?: string;
  colors?: [string, string];
}

const Loader: FC<LoaderProps> = ({
  visible,
  height,
  width,
  wrapperClass,
  colors,
}) => {
  return (
    <Hourglass
      visible={visible || true}
      height={height || "80"}
      width={width || "80"}
      ariaLabel="hourglass-loading"
      wrapperClass={wrapperClass || ""}
      colors={colors || ["#202124", "#202124"]}
    />
  );
};

export default Loader;
