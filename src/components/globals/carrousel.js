import {
  Dialog,
  Box,
  ImageListItem,
  ImageList,
  IconButton,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useState } from "react";

export default function Carrousel({ children: slides, handleClose, open }) {
  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    };
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ width: "100%", height: 450, overflowY: "scroll" }}>
        <ImageList
          sx={{
            width: 500,
            height: 450,
            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
            transform: "translateZ(0)",
          }}
          rowHeight={200}
          gap={1}
        >
          {slides.map((item) => {
            const cols = item.featured ? 2 : 1;
            const rows = item.featured ? 2 : 1;

            return (
              <ImageListItem key={item.img} cols={cols} rows={rows}>
                <img
                  {...srcset(item.props.src, 250, 200, rows, cols)}
                  alt={item.title}
                  loading="lazy"
                />
                <img
                  {...srcset(item.img, 250, 200, rows, cols)}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={item.title}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`star ${item.title}`}
                    ></IconButton>
                  }
                  actionPosition="left"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={item.title}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`star ${item.title}`}
                    ></IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    </Dialog>
  );
}
