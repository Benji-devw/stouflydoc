// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // console.log(req.method);

  if (req.method === 'POST') {
    console.log('POST');
    res.status(200).json({ data: 'success' });
    return
  }
  else if (req.method === 'GET') {
    const getTracks = await getTracks()
    const getAllTracks = await getAllTracks()
    res.status(200).json(getTracks)
    res.status(200).json(getAllTracks)
  } 
  else {res.status(405).json({ error: `Method '${req.method}' Not Allowed` });}
  
  const body = JSON.parse(req.body)
  // console.log(body);
}


export async function getTracks(query) {
  console.log(query);
  // &_limit=${query._limit}
  // let url = ``
  // if (query._limit != undefined) {
  //   url = `http://localhost:8080/tracks/${query.category !== undefined ? `?category=${query.category}&_limit=${query._limit}` : `?_limit=${query._limit}` }`
  // } else {
  //   url = `http://localhost:8080/tracks/?_limit=${5}`
  // }
  
  try {
    const res = await fetch(`http://localhost:8080/tracks/${query.category !== undefined ? `?category=${query.category}` : `` }`)
      .then(r => r.json())
      return {
        props: {res}
      }
  } catch (err) {
    console.error(err);
  }
}

export async function getAllTracks() {
  try {
    const res = await fetch(`http://localhost:8080/tracks/category`)
      .then(r => r.json())
      return {
        props: {res}
      }
  } catch (err) {
    console.error(err);
  }
}
