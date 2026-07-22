import { useEffect } from "react";

import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Link from "@tiptap/extension-link";

import { Box, IconButton, Stack, Tooltip } from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LinkIcon from "@mui/icons-material/Link";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false,
        autolink: false,
      }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  function addLink() {
    const url = window.prompt("URL du lien");

    if (!url) {
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  }

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.5}>
        <Tooltip title="Gras">
          <IconButton
            color={editor.isActive("bold") ? "primary" : "default"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FormatBoldIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italique">
          <IconButton
            color={editor.isActive("italic") ? "primary" : "default"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalicIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Liste">
          <IconButton
            color={editor.isActive("bulletList") ? "primary" : "default"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Lien">
          <IconButton color={editor.isActive("link") ? "primary" : "default"} onClick={addLink}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          padding: 2,
          minHeight: 250,

          "& .ProseMirror": {
            outline: "none",
            minHeight: 200,

            "& strong": {
              fontWeight: 900,
            },

            "& em": {
              fontStyle: "italic",
            },

            "& ul": {
              paddingLeft: 3,
            },

            "& a": {
              textDecoration: "underline",
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Stack>
  );
}
