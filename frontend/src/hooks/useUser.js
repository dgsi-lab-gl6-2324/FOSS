import { useCallback, useContext } from "react";
import {Context} from "../context/UserContext";

export default function useUser() {
  const { jwt, setJwt } = useContext(Context);

  const login = useCallback(() => {
    setJwt("token");
  }, [setJwt]);

  return {
    isLogged: Boolean(jwt),
    login,
  };
}