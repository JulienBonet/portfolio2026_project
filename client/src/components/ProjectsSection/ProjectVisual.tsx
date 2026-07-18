import { Box } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./projectVisual.css";

import type { ProjectDetail } from "@/types/project";

type Props = {
  project: ProjectDetail;
};

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);

  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function ProjectVisual({ project }: Props) {
  if (project.youtube_url) {
    const embedUrl = getYoutubeEmbedUrl(project.youtube_url);

    if (embedUrl) {
      return (
        <Box
          component="iframe"
          src={embedUrl}
          allowFullScreen
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            border: 1,
            borderRadius: "5px",
          }}
        />
      );
    }
  }

  if (project.images.length > 0) {
    return (
      <Box
        sx={{

          border: 1,
          borderRadius: "5px",

        }}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {project.images.map((image) => (
            <SwiperSlide key={image.id}>
              <Box
                component="img"
                src={image.image_url}
                alt={project.title}
                sx={{
                  width: "100%",

                  p: 5,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src="/images/project_placeholder.png"
      alt="placeholder"
      sx={{
        width: "100%",
        borderRadius: "10px",
      }}
    />
  );
}
