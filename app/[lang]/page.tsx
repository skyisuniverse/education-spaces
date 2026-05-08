import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Image from "next/image";
import localImage from "../../public/images/logo/adr-logo.jpg";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Box>
      {/*<Typography
        variant="h2"
        sx={{
          typography: {
            xs: 'h3',   // h3 on mobile (xs)
            md: 'h2',   // h2 on desktop and up (md = 900px+)
          },
          fontWeight: {
            xs: 100,
            md: 100,
          },
        }}
        gutterBottom
      >
        {dict.title}
      </Typography>

      <Divider />

      <br />

      <Box
        sx={{
          width: { xs: '100%', md: '50%' },     // 100% on mobile, 50% on desktop (md = 900px+)
          maxWidth: '100%',                     // prevent overflow
        }}
      >
        <Image
          src={localImage}
          alt="Architecture Decision Records logo"
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',                   // removes any default inline spacing
          }}
          priority
        />
      </Box>

      <br />

      <Typography
        variant="body1"
        gutterBottom
      >
        {dict.welcome}
      </Typography>

      <br />

      <Typography
        sx={{ fontWeight: '100' }}
        variant="h4"
        gutterBottom
      >
        {dict['definition-title']}
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
      >
        {dict['definition-description']}
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
      >
        {dict['definition-description-2']}
      </Typography>

      <Box sx={{ maxWidth: 600 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <LightbulbOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={dict['purpose-1']}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <DesignServicesOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={dict['purpose-2']}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <GroupAddOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={dict['purpose-3']}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ExploreOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={dict['purpose-4']}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <BalanceOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={dict['purpose-5']}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ChecklistRtlIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={dict['purpose-6']}
            />
          </ListItem>
        </List>
      </Box>*/}
    </Box>
  );
}
