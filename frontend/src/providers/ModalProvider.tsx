import React, {
	createContext,
	useCallback,
	useState,
	FC,
	ReactNode,
	useMemo,
	useRef,
} from "react";

interface ModalContextType {
	render: <T>(id: string, Component: FC<T>, props: T) => void;
	remove: (id: string) => void;
}

const ModalContext = createContext<ModalContextType>({
	render: () => {},
	remove: () => {},
});

const Modals: React.FC<{ modals: Record<string, ReactNode> }> = ({
	modals,
}) => {
	const modalsMemo = useMemo(() => {
		return Object.entries(modals).map(([id, modal]) => (
			<React.Fragment key={id}>{modal}</React.Fragment>
		));
	}, [modals]);

	return <div>{modalsMemo}</div>;
};

const Children: FC<{
	children: ReactNode;
}> = ({ children }) => {
	return <>{children}</>;
};

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const modalsRef = useRef<Record<string, ReactNode>>({});
	const [modalsMemo, setModalsMemo] = useState<Record<string, ReactNode>>({});

	const renderModal = useCallback(
		<T,>(id: string, Component: FC<T>, props: T) => {
			modalsRef.current = {
				...modalsRef.current,
				[id]: <Component {...props} key={id} />,
			};
			setModalsMemo({ ...modalsRef.current });
		},
		[]
	);

	const removeModal = useCallback((id: string) => {
		const newModals = { ...modalsRef.current };
		delete newModals[id];
		modalsRef.current = newModals;
		setModalsMemo({ ...modalsRef.current });
	}, []);

	const providerValue = useMemo(
		() => ({
			render: renderModal,
			remove: removeModal,
		}),
		// eslint-disable-next-line
		[]
	);

	const childrenMemo = React.Children.map(children, (child) => {
		return React.cloneElement(child as React.ReactElement, {
			modals: modalsMemo,
		});
	});

	return (
		<ModalContext.Provider value={providerValue}>
			<Children>{childrenMemo}</Children>
			<Modals modals={modalsMemo} />
		</ModalContext.Provider>
	);
};

export { ModalProvider, ModalContext };
