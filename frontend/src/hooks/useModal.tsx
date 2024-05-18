import { useModalContext, useTranslation } from "@providers/index";
import { ModalsType } from "@types";
import { FC, useMemo, useState, useEffect } from "react";

interface ModalProps<T> {
	component: FC<T>;
	defaultValues?: Omit<T, keyof ModalsType>;
	key: string;
}

interface ModalReturnTypes<T> {
	trigger: () => void;
	parseValues: (val: Omit<T, keyof ModalsType>) => void;
	promiseTrigger: () => Promise<unknown>;
}

const useModal = <T,>({
	component,
	defaultValues,
	key,
}: ModalProps<T>): ModalReturnTypes<T> => {
	const { render, remove } = useModalContext();
	const t = useTranslation();

	const [isOpen, setIsOpen] = useState(false);
	const [modalValues, setModalValues] = useState<Omit<
		T,
		keyof ModalsType
	> | null>(defaultValues || null);

	const values = useMemo(
		() => ({
			...modalValues,
			open: isOpen,
			onClose: () => setIsOpen(false),
			t,
		}),
		[isOpen, modalValues, t]
	);

	useEffect(() => {
		if (isOpen) {
			render(key, component, values as T);
		} else {
			remove(key);
		}

		return () => remove(key);
	}, [isOpen, key, render, remove, values, component]);

	const trigger = () => {
		setIsOpen(!isOpen);
	};

	const promiseTrigger = async () => {};

	const parseValues = (val: Omit<T, keyof ModalsType>) => {
		setModalValues(val);
	};

	return {
		trigger,
		parseValues,
		promiseTrigger,
	};
};

export default useModal;
