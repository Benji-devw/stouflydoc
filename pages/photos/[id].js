import { getPhotoById } from "../api/pexels";
import { Box } from "@chakra-ui/react";
import Image from "next/image";


export default function Photos({pic}) {

  // console.log('[id]' + pic.src.original);

    return (
      <Box p="2rem" bg="gray.200" minH="100vh">
        <Image src={pic.src.original} alt={pic.url} layout="fill" className="object-cover h-48 w-full" />
      </Box>
    )
  }


export async function getServerSideProps({ params }) {
  console.log(params);
  const pic = await getPhotoById(params.id);
  return {
    props: {
      pic,
    },
  };
}