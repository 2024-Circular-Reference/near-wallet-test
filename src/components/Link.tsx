import { useRouter } from '@src/stores/useRouter';
import { Pathname } from '@src/types/router';

export default function Link({ pathname, children }: { pathname: Pathname; children: React.ReactNode }) {
  const { setPathname } = useRouter();
  return <button onClick={() => setPathname(pathname)}>{children}</button>;
}
