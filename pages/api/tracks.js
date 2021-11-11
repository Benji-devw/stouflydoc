// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // console.log(req.method);

  if (req.method === 'POST') {
    console.log('POST');
    res.status(200).json({ data: 'success' });
    return
  }
  else if (req.method === 'GET') {
    const jsonData = await getTracks()
    const getCats = await getCats()
    res.status(200).json(jsonData)
    res.status(200).json(getCats)
  } 
  else {res.status(405).json({ error: `Method '${req.method}' Not Allowed` });}
  
  const body = JSON.parse(req.body)
  // console.log(body);
}


export async function getTracks(category) {
  try {
    const res = await fetch(`http://localhost:8080/tracks/${category !== undefined ? `?category=${category}` : ''}`)
      .then(r => r.json())
      return {
        props: {res}
      }
  } catch (err) {
    console.error(err);
  }
}


