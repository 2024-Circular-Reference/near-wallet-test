import ReactDOM from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex flex-col justify-center items-center z-100"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      {children}
      <p className="text-red text-2xl">Loading...</p>
    </div>,
    document.getElementById('modal-root'),
  );
}
