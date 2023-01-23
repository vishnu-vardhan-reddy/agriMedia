import { Button } from "@mui/material";
import "./Button.css";
import { indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      contrastText: "#fff",
    },
    secondary: {
      main: "#37D0AF",
      contrastText: "#fff",
    },
  },
});

export default function ButtonSolid({
  variant,
  color,
  size,
  fullWidth,
  disabled,
  onClick,
  title,
  EndIcon
}) {
  return (
    <ThemeProvider theme={buttonTheme}>
      <Button
        className="button-solid"
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        onClick={onClick}
        endIcon={<EndIcon />}
        type='button'
      >
        {title}
      </Button>
    </ThemeProvider>
  );
}
