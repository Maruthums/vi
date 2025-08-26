import { Box } from "@mui/material";
import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: string, path?: string) => {
        setActiveButton(buttonName);
        if (path) {
            navigate(path);
        }
    };

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
                ml: isMobile ? 2 : 0,
            }}
        >
            <Box sx={{ mt: 1 }} />
            {!isMobile && (
                <SideButton onClick={handleDrawerToggle} icon={<MenuIcon />} open={open} />
            )}
            <SideButton name="Dashboard" icon={<SpaceDashboard />} open={open} onClick={() => handleButtonClick('Dashboard', '/')} active={activeButton === 'Dashboard'} />
            <SideButton name="Users" icon={<GroupRoundedIcon />} open={open} onClick={() => handleButtonClick('Users', '/users')} active={activeButton === 'Users'} />
            <SideButton name="Security" icon={<SecurityRoundedIcon />} open={open} onClick={() => handleButtonClick('Security')} active={activeButton === 'Security'} />
            <SideButton name="Location" icon={<RoomRoundedIcon />} open={open} onClick={() => handleButtonClick('Location')} active={activeButton === 'Location'} />
            <SideButton name="Analytics" icon={<BarChartRoundedIcon />} open={open} onClick={() => handleButtonClick('Analytics')} active={activeButton === 'Analytics'} />
            <Box sx={{ flexGrow: 1 }} />
            <SideButton name="Logout" icon={<ExitToAppRoundedIcon />} open={open} />
        </Box>
    );
};
