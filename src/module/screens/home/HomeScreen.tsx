import {
    Box,
    Grid,
    Pagination,
    Typography,
} from "@mui/material";
import SearchBar from "../../components/search";
import { Colors } from "../../utils/color";
import React from "react";
import UserCard from "../../components/userCard";
import { useNavigate } from "react-router-dom";


const users = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    firstName: `First Name ${i + 1}`,
    lastName: `Last Name ${i + 1}`,
    username: `User Name${i + 1}`,
    avatarUrl: i % 2 === 0 ? "https://i.pravatar.cc/150?img=3" : undefined,
}));

const HomeScreen = () => {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState("");
    const itemsPerPage = 9;

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const filteredFiles = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.includes(searchQuery) || user.username.includes(searchQuery)
    );

    const handleUserClick = (user: { id: number }) => {
        navigate(`/user-view/${user.id}`, { state: { fromDashboard: user } });
    };

    return (
        <Box p={1}>
            <Box sx={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 10, py: 2 }}>
                <Typography
                    sx={{ fontSize: "24px", fontWeight: "bold", mb: 2, color: Colors.greys.DarkGrey }}
                >
                    Customer Details
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
                    <SearchBar
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                    />
                </Box>
            </Box>
            {filteredFiles.length === 0 ? (
                <Typography align="center" sx={{ mt: 5, fontSize: 18, color: Colors.greys.Mono4 }}>
                    No data found for "{searchQuery}"
                </Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {filteredFiles?.map((u) => (
                            <Grid key={u.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} onClick={() => handleUserClick(u)}>
                                <UserCard
                                    key={u.id}
                                    firstName={u.firstName}
                                    lastName={u.lastName}
                                    username={u.username}
                                    avatarUrl={u.avatarUrl}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={3} display="flex" justifyContent="center">
                        <Pagination
                            count={Math.ceil(filteredFiles.length / itemsPerPage)}
                            page={page}
                            onChange={handleChange}
                            color="primary"
                            shape="rounded"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default HomeScreen;
