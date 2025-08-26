import { Box } from "@mui/material";
import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

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
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            bgcolor: active ? "#ffffff" : "transparent",
            color: active ? "#057c11" : "#ffffff",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
                bgcolor: active ? "#a8e063" : "rgba(255,255,255,0.1)",
            },
            overflow: "hidden",
        }}
    >
        {icon}
        <Box>
            {open && (
                <span
                    style={{
                        marginLeft: 8,
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        transition: "width 0.3s ease",
                    }}
                >
                    {name}
                </span>
            )}
        </Box>
    </Box>
);

export const Sidebar = ({
    open,
    isMobile,
    handleDrawerToggle,
}: {
    open: boolean;
    isMobile: boolean;
    handleDrawerToggle: () => void;
}) => {
    const navigate = useNavigate();
    const location = useLocation(); // get current route

    // helper to check active state
    const isActive = (path: string) => {
        if (path === "/") return location.pathname === "/";
        if (path.startsWith("/users")) return location.pathname.startsWith("/users");
        if (path.startsWith("/user-view")) return location.pathname.startsWith("/user-view");
        if (path.startsWith("/security")) return location.pathname.startsWith("/security");
        if (path.startsWith("/location")) return location.pathname.startsWith("/location");
        if (path.startsWith("/analytics")) return location.pathname.startsWith("/analytics");
        return location.pathname === path;
    };

    return (
        <Box
            sx={{
                height: "92vh",
                width: open ? 220 : 70,
                background: "linear-gradient(180deg, #28a745 0%, #a8e063 100%)",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                py: 2,
                transition: "width 0.3s ease",
                borderRadius: 2,
                ml: isMobile ? 2 : 0,
            }}
        >
            <Box sx={{ mt: 1 }} />
            {!isMobile && (
                <SideButton
                    onClick={handleDrawerToggle}
                    icon={<MenuIcon />}
                    open={open}
                />
            )}

            <SideButton
                name="Dashboard"
                icon={<SpaceDashboard />}
                open={open}
                onClick={() => navigate("/")}
                active={isActive("/")}
            />
            <SideButton
                name="Users"
                icon={<GroupRoundedIcon />}
                open={open}
                onClick={() => navigate("/users")}
                active={isActive("/users") || isActive("/user-view")}
            />
            <SideButton
                name="Security"
                icon={<SecurityRoundedIcon />}
                open={open}
                onClick={() => navigate("/security")}
                active={isActive("/security")}
            />
            <SideButton
                name="Location"
                icon={<RoomRoundedIcon />}
                open={open}
                onClick={() => navigate("/location")}
                active={isActive("/location")}
            />
            <SideButton
                name="Analytics"
                icon={<BarChartRoundedIcon />}
                open={open}
                onClick={() => navigate("/analytics")}
                active={isActive("/analytics")}
            />

            <Box sx={{ flexGrow: 1 }} />

            <SideButton
                name="Logout"
                icon={<ExitToAppRoundedIcon />}
                open={open}
                onClick={() => console.log("logout")}
            />
        </Box>
    );
};
