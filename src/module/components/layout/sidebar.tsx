import { Box } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DevicesOtherRoundedIcon from "@mui/icons-material/DevicesOtherRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const SideButton = ({
    icon,
    active,
    onClick,
    name,
    open,
}: {
    icon: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    name?: string;
    open?: boolean;
}) => (
    <Box
        onClick={onClick}
        sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            borderTopRightRadius: 20,   // more noticeable curve
            borderBottomLeftRadius: 20, // asymmetric pill style
            bgcolor: active ? "#ffffff" : "transparent", // white when active
            color: active ? "#057c11" : "#ffffff",       // dark green text on active
            cursor: "pointer",
            transition: "all 0.3s ease", // smooth hover/active transitions
            "&:hover": {
                bgcolor: active ? "#a8e063" : "rgba(255,255,255,0.1)", // light green on hover
            },
            overflow: "hidden",
        }}
    >
        {icon}
        <Box>
            {open && (
                <span
                    style={{ marginLeft: 8, fontSize: 14, whiteSpace: "nowrap", transition: "width 0.3s ease", }}
                >
                    {name}
                </span>
            )}
        </Box>
    </Box>
);

export const Sidebar = ({ open, isMobile, handleDrawerToggle }: { open: boolean, isMobile: boolean, handleDrawerToggle: () => void }) => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    return (
        <Box
            sx={{
                height: "92vh",
                width: open ? 220 : 70,
                background: "linear-gradient(180deg, #28a745 0%, #a8e063 100%)",
                display: "flex",
                flexDirection: "column",
                position: 'fixed',
                py: 2,
                transition: "width 0.3s ease",
                borderRadius: 2,
            }}
        >
            <Box sx={{ mt: 1 }} />
            {!isMobile && (
                <SideButton onClick={handleDrawerToggle} icon={<MenuIcon />} open={open} />
            )}
            <SideButton name="Dashboard" icon={<HomeRoundedIcon />} open={open} onClick={() => setActiveButton('Dashboard')} active={activeButton === 'Dashboard'} />
            <SideButton name="Devices" icon={<DevicesOtherRoundedIcon />} open={open} onClick={() => setActiveButton('Devices')} active={activeButton === 'Devices'} />
            <SideButton name="Security" icon={<SecurityRoundedIcon />} open={open} onClick={() => setActiveButton('Security')} active={activeButton === 'Security'} />
            <SideButton name="Location" icon={<RoomRoundedIcon />} open={open} onClick={() => setActiveButton('Location')} active={activeButton === 'Location'} />
            <SideButton name="Users" icon={<GroupRoundedIcon />} open={open} onClick={() => setActiveButton('Users')} active={activeButton === 'Users'} />
            <SideButton name="Analytics" icon={<BarChartRoundedIcon />} open={open} onClick={() => setActiveButton('Analytics')} active={activeButton === 'Analytics'} />
            <Box sx={{ flexGrow: 1 }} />
            <SideButton name="Logout" icon={<ExitToAppRoundedIcon />} open={open} />
        </Box>
    );
};
