import { FC, Fragment, useMemo, useState } from "react";
import useBooleanState from "./useBooleanState";
import { ModalsType } from "@types";

interface ModalProps<T> {
  component: FC<T>;
  defaultValues?: Omit<T, keyof ModalsType>;
}

interface ModalReturnTypes<T> {
  trigger: () => void;
  parseValues: (val: Omit<T, keyof ModalsType>) => void;
  render: () => JSX.Element;
  //   promiseTrigger: () => Promise<any>;
}

const useModal = <T,>({
  component,
  defaultValues,
}: ModalProps<T>): ModalReturnTypes<T> => {
  type ComponentParamsExludeFunctionControls = Omit<T, keyof ModalsType>;

  const [isOpen, switchOpen] = useBooleanState(false);
  const [modalValues, setModalValues] =
    useState<ComponentParamsExludeFunctionControls | null>(
      defaultValues || null
    );
  const [key, setKey] = useState(0);

  const values = useMemo(() => {
    return {
      open: isOpen,
      onClose: switchOpen,
      ...modalValues,
    } as T;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, modalValues]);

  const render = () => {
    return <Fragment key={key}>{component(values)}</Fragment>;
  };

  const trigger = () => {
    if (!modalValues) throw new Error("Modal values are not set");

    setKey((prev) => prev + 1);

    switchOpen();
  };

  //   const promiseTrigger = async () => {};

  const parseValues = (val: ComponentParamsExludeFunctionControls) => {
    setModalValues(val);
  };

  return {
    trigger,
    parseValues,
    render,
    // promiseTrigger,
  };
};

export default useModal;
