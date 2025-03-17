import { Tooltip, IconButton } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

export default function FileUpload() {
  return (
    <Tooltip label="Subir archivo" hasArrow>
      <IconButton
        as={motion.button}
        icon={<AttachmentIcon />}
        colorScheme="teal"
        variant="ghost"
        aria-label="Subir archivo"
        borderRadius="full"
        size="md"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        isDisabled
      />
    </Tooltip>
  );
}
