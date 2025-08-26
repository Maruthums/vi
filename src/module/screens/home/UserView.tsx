import {
  Avatar,
  Box,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import SearchBar from "../../components/search";
import { Colors } from "../../utils/color";
import CommonDropdown from "../../components/dropdown";
import FileCard from "../../components/fileCard";
import React from "react";
import { useLocation } from "react-router-dom";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

const UserView = () => {
  const location = useLocation();
  const { fromDashboard } = location.state || {}; // ✅ user object passed in navigate
  console.log('fromDashboard', fromDashboard);
  const initials = `${fromDashboard?.firstName?.[0] ?? ""}${fromDashboard?.lastName?.[0] ?? ""}`;

  const files = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    previewUrl: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    name: `${fromDashboard?.username}-${i + 1}.pdf`,
    size: `${(Math.random() * 5 + 0.5).toFixed(2)} MB`,
    createdAt: new Date(
      2025,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toDateString(),
  }));
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [select, setSelect] = React.useState(currentYear);

  const itemsPerPage = 9;

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) || file.createdAt.includes(searchQuery) || file.size.includes(searchQuery)
  );

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box p={1}>
      {/* Sticky Avatar + Username */}
      <Box
        sx={{
          position: "sticky",
          top: 60, // adjust if you already have a navbar
          backgroundColor: "#fff",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          py: 1,
        }}
      >
        <Avatar
          src={fromDashboard?.avatarUrl}
          alt={`${fromDashboard?.firstName} ${fromDashboard?.lastName}`}
          sx={{ width: 56, height: 56, bgcolor: "primary.main", mr: 2 }}
        >
          {!fromDashboard?.avatarUrl && initials}
        </Avatar>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "bold", color: Colors.greys.DarkGrey }}
        >
          {fromDashboard?.username}
        </Typography>
      </Box>

      {/* Sticky Search + Dropdown, below Avatar */}
      <Box
        sx={{
          position: "sticky",
          top: 120, // 👈 Avatar height (56px) + padding (~50px) ≈ 120px
          backgroundColor: "#fff",
          zIndex: 15,
          py: 1,
          borderBottom: "1px solid #eee",
          mb: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <SearchBar
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
        <CommonDropdown data={years} label="Select Year" select={select} setSelect={setSelect} />
      </Box>

      {/* File Grid */}
      {filteredFiles.length === 0 ? (
        <Typography align="center" sx={{ mt: 5, fontSize: 18, color: Colors.greys.Mono4 }}>
          No data found for "{searchQuery}"
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {paginatedFiles.map((file) => (
              <Grid key={file.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <FileCard
                  previewUrl={file.previewUrl}
                  name={file.name}
                  size={file.size}
                  createdAt={file.createdAt}
                  onDownload={() => alert(`Downloading ${file.name}`)}
                  onDelete={() => alert(`Deleting ${file.name}`)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
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

export default UserView;
