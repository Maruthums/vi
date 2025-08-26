import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface FileCardProps {
  previewUrl: string; // image URL
  name: string;
  size: string;
  createdAt: string;
  onDownload?: () => void;
  onDelete?: () => void;
}

export default function FileCard({
  previewUrl,
  name,
  size,
  createdAt,
  onDownload,
}: FileCardProps) {
  return (
    <Card
      sx={{
        width: { xs: 340, sm: 300, md: 280 },
        borderRadius: 1,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.2)" },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={previewUrl}
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {size} • {createdAt}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          {onDownload && (
            <IconButton size="small" color="success" onClick={onDownload}>
              <DownloadIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
