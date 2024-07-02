interface ModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: (value: boolean) => void;
    children?: React.ReactNode;
    setModalChildren: (value: React.JSX.Element | undefined) => void;
}

function Modal({ modalIsOpen, setModalIsOpen, children, setModalChildren }: ModalProps) {
    return (
        <div style={
            {
                transform: modalIsOpen ? "translateX(0%)" : "translateX(-200%)",
            }
        } className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500">
            <div className="container mx-auto max-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4">
                <button onClick={() => {
                    setModalIsOpen(false);
                    setModalChildren(undefined);
                }} className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600" >X</button>
                {children}
            </div>
        </div>
    )
}

export default Modal;