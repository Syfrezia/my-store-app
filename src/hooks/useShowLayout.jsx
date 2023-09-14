import { useLocation } from "react-router-dom";

export function useShowLayout() {
  const location = useLocation();
  const hiddenRoutes = ["/checkout", "/payment"];

  return !hiddenRoutes.includes(location.pathname);
}
