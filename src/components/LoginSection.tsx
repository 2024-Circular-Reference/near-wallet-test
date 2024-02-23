import { useRef } from 'react';

export default function LoginSection() {
  const idRef = useRef<HTMLInputElement>();
  const pwRef = useRef<HTMLInputElement>();

  const handleSubmit = async () => {
    if (idRef.current && pwRef.current) {
      console.log('login');
      // const res = await loginNear(idRef.current.value, pwRef.current.value);
      // alert(res);
    } else {
      alert('id or pw is empty');
    }
  };

  return (
    <section className="flex flex-col w-full min-h-screen items-center justify-center noscroll gap-y-2">
      <p>hello, popup!!</p>
      <input ref={idRef} placeholder="id" className="w-40 h-8 border rounded-xl px-2" />
      <input ref={pwRef} placeholder="pw" className="w-40 h-8 border rounded-xl px-2" />
      <button onClick={handleSubmit} className="w-40 h-8 bg-gray-900 text-white rounded-xl">
        Submit
      </button>
    </section>
  );
}
