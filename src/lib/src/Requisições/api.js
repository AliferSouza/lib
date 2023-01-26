export default async function Api(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const valorDta = await data;
      return valorDta;
    } catch {
      return null;
    }
  }