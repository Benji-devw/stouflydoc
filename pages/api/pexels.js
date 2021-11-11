


export const getCategory = async (category) => {
  try {
    const res = await fetch(`http://localhost:8080/tracks/`)
      .then(r => r.json())
      return {
        props: {res}
      }
  } catch (err) {
    console.error(err);
  }
};