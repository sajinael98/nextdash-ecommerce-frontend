import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

interface LoaderProp {
  loading: boolean;
  show: VoidFunction;
  hide: VoidFunction;
}

const LoaderContext = createContext<LoaderProp>({
  loading: true,
  show: () => {},
  hide: () => {},
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, { open: show, close: hide }] = useDisclosure(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      hide();
    }, 750);
    return () => {
      clearTimeout(timeout);
      show();
    };
  }, [pathname, searchParams]);

  return (
    <LoaderContext.Provider value={{ loading, hide, show }}>
      <LoadingOverlay visible={loading} />
      {children}
    </LoaderContext.Provider>
  );
};
