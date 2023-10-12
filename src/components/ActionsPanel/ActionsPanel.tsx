import { Check, Delete } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";

type ActionsPanelProps = {
  loading: boolean;
  filter: string;
  setFilter: (filter: string) => void;
  onCompleteAll: () => void;
  onDeleteCompleted: () => void;
};

const CommonBox = (props: BoxProps) => (
  <Box
    sx={{
      maxWidth: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 24px",
    }}
    {...props}
  />
);

const LoadingPanel = () => {
  return (
    <CommonBox>
      {Array.from(Array(3).keys()).map((index) => (
        <Skeleton
          key={index}
          animation="wave"
          variant="rectangular"
          sx={{
            width: "30%",
            height: "50px",
          }}
        />
      ))}
    </CommonBox>
  );
};

const commonButtonProps: any = {
  color: "secondary",
  sx: {
    height: "50px",
    width: "30%",
  },
};

export const ActionsPanel = ({
  loading,
  filter,
  onCompleteAll,
  onDeleteCompleted,
  setFilter,
}: ActionsPanelProps) => {
  if (loading) return <LoadingPanel />;

  return (
    <CommonBox>
      <Select
        variant="standard"
        value={filter}
        onChange={(event) => setFilter(event.target.value as string)}
        {...commonButtonProps}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="incomplete">Incomplete</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </Select>
      <Button onClick={onCompleteAll} {...commonButtonProps}>
        <Check /> Complete All
      </Button>
      <Button onClick={onDeleteCompleted} {...commonButtonProps}>
        <Delete /> Delete Completed
      </Button>
    </CommonBox>
  );
};
