export default async function atualizarComp(tag, props) {
    document.querySelector(await tag).innerHTML = await props;
  }