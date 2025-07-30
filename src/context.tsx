import React, { createContext, useState } from "react";

interface OpenBrainContextType {
  username: string;
  setUsername: (x: string) => void;
}

export const OpenBrainContext = createContext<OpenBrainContextType>({
  username: 'username',
  setUsername: () => {}
});

export const OpenBrainProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>('username');

  return (
    <OpenBrainContext value={{ username, setUsername }}>
      {children}
    </OpenBrainContext>
  );
};
