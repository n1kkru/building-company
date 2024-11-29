import * as React from "react";
import { styled } from "@mui/material/styles";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "../state/store";
import { fetchGetFilesById } from "../state/reportsSlice";
import { useNavigate } from "react-router-dom";

interface DemoLinkProps {
  href: string;
  children: string;
  tabIndex: number;
}

const Link = styled("a")({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  color: "inherit",
});

const LinkFile = React.memo(function DemoLink(props: DemoLinkProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useSelector((state) => state.reportsReducers.file);


  return (
    <Link
      tabIndex={props.tabIndex}
      onMouseOver={() => {
        dispatch(fetchGetFilesById(Number(props.href)));
      }}
      href={url}
    >
      {props.children}
    </Link>
  );
});

export function renderFiles(params: GridRenderCellParams<any, string, any>) {
  const link = params.value ?? "";

  return (
    <LinkFile href={link} tabIndex={params.tabIndex}>
      {link}
    </LinkFile>
  );
}
