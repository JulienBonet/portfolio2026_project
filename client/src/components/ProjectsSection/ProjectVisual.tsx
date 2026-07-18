import { useState } from "react";

import { Box } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";

import Lightbox from "yet-another-react-lightbox";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "yet-another-react-lightbox/styles.css";

import "./projectVisual.css";

import type { ProjectDetail } from "@/types/project";

type Props = {
  project: ProjectDetail;
};

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
  );

  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : null;
}

export default function ProjectVisual({
  project,
}: Props) {
  const [open, setOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  // PRIORITÉ 1 : YOUTUBE

  if (project.youtube_url) {
    const embedUrl = getYoutubeEmbedUrl(
      project.youtube_url,
    );

    if (embedUrl) {
      return (
        <Box
          component="iframe"
          src={embedUrl}
          allowFullScreen
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        />
      );
    }
  }

  // PRIORITÉ 2 : GALERIE IMAGES

  if (project.images.length > 0) {
    return (
      <>
        <Box
          sx={{
            border: "1px solid black",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <Swiper
            modules={[
              Navigation,
              Pagination,
            ]}
            navigation
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={20}
          >
            {project.images.map(
              (image, index) => (
                <SwiperSlide
                  key={image.id}
                >
                  <Box
                    component="img"
                    src={image.image_url}
                    alt={project.title}
                    onClick={() => {
                      setCurrentIndex(index);
                      setOpen(true);
                    }}
                    sx={{
                      width: "100%",
                      p: 5,
                      cursor: "pointer",
                      display: "block",
                    }}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </Box>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={currentIndex}
          slides={project.images.map(
            (image) => ({
              src: image.image_url,
            }),
          )}
        />
      </>
    );
  }

  // PRIORITÉ 3 : PLACEHOLDER

  return (
    <Box
      component="img"
      src="/images/project_placeholder.jpg"
      alt="placeholder"
      sx={{
        width: "100%",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    />
  );
}
