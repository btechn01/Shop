import { useTheme, Breakpoint } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  query: "up" | "down" | "between";
  key: number | Breakpoint;
  start?: number | Breakpoint;
  end?: number | Breakpoint;
}

const useResponsive = ({ query, key, start = "xs", end = "lg" }: Props) => {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(key));

  const mediaDown = useMediaQuery(theme.breakpoints.down(key));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  if (query === "between") {
    return mediaBetween;
  }

  return null;
};

export default useResponsive;
