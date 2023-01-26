export default async function addComponet(tag, props) {
    document.querySelector(await tag).innerHTML += await props;
  }
  