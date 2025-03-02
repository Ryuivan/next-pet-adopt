"use client";

import { RouteType } from "@/types/RouteType";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes: RouteType[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Pets",
    href: "/pets",
  },
];

const HeaderRoute = () => {
  const pathname = usePathname();

  return (
    <>
      {routes.map(({ name, href }: RouteType) => (
        <Link href={href} key={name}>
          <Button
            variant="text"
            size="small"
            sx={{
              padding: "8px 12px",
            }}
          >
            <Typography
              color={pathname === href ? "text.secondary" : "text.primary"}
              fontWeight={600}
              fontSize="16px"
            >
              {name}
            </Typography>
          </Button>
        </Link>
      ))}
    </>
  );
};

export default HeaderRoute;
