import {
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

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

const files = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  previewUrl: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  name: `File-${i + 1}.pdf`,
  size: `${(Math.random() * 5 + 0.5).toFixed(2)} MB`,
  createdAt: new Date(
    2025,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toDateString(),
}));

const DashboardBaseScreen = () => {
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
      <Box sx={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 10, py: 2 }}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "bold", mb: 2, color: Colors.greys.DarkGrey }}
        >
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
          <SearchBar
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              setPage(1); // reset to first page when searching
            }}
          />
          <CommonDropdown data={years} label="Select Year" select={select} setSelect={setSelect} />
        </Box>
      </Box>
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

export default DashboardBaseScreen;
