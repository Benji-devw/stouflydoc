import React, {useRef} from "react";
import Layout from "@/components/Layout";
import { getSession } from "next-auth/client";

export default function Profile () {
  const session = getSession()
  console.log(session);
  return (
    <Layout page={'Profile'}>
      {session &&
        <h2>PROFILE</h2>
      
      }
    </Layout>

  )
}

