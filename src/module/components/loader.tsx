import { Box, CircularProgress, Container } from "@mui/material";
interface IProps {
  fixedHeight?: string;
  circularProgressSize?: number;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const Loader = (props: IProps) => {
  return (
    <Container sx={{ height: (props.fixedHeight)? props.fixedHeight  : "95vh" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <CircularProgress color={props.color ? props.color : "primary"} size={ props.circularProgressSize ? props.circularProgressSize : undefined }/>
      </Box>
    </Container>
  );
};

export default Loader;
