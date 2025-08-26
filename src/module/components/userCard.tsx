import {
    Card,
    CardContent,
    Avatar,
    Typography,
} from "@mui/material";

interface UserCardProps {
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
}

export default function UserCard({
    firstName,
    lastName,
    username,
    avatarUrl
}: UserCardProps) {
    const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`;
    return (
        <Card sx={{ display: "flex", alignItems: "center", p: 1.5, borderRadius: 1.5, boxShadow: 3, width: 270, cursor: "pointer", }}>
            <Avatar
                src={avatarUrl}
                alt={`${firstName} ${lastName}`}
                sx={{ width: 56, height: 56, bgcolor: "primary.main", mr: 2 }}
            >
                {!avatarUrl && initials}
            </Avatar>
            <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" component="div">
                    {firstName} {lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    @{username}
                </Typography>
            </CardContent>
        </Card>
    );
}
