import { styled, alpha } from "@mui/material/styles";
import { Select, MenuItem } from "@mui/material";

const Dropdown = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 12,
    backgroundColor: alpha(theme.palette.common.black, 0.04),
    marginLeft: 0,
    width: "20%",
    padding: "4px 8px",
}));

interface CommonDropdownProps {
    data: any[];
    label?: string;
    select: number;
    setSelect: (value: number) => void;
}

export default function CommonDropdown({ data, label, select, setSelect }: CommonDropdownProps) {
    return (
        <Dropdown>
            <Select
                fullWidth
                value={select}
                displayEmpty
                onChange={(e) => setSelect(e.target.value)}
                sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
            >
                <MenuItem value="">
                    <em>{label}</em>
                </MenuItem>
                {data.map((y) => (
                    <MenuItem key={y} value={y}>
                        {y}
                    </MenuItem>
                ))}
            </Select>
        </Dropdown>
    );
}
