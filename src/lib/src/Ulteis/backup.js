export default function backup(props, tipo, textNomeArqDow) {
    let blob = new Blob([`${props}`], { type: `${tipo}` });
    const link = window.document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${textNomeArqDow || "export.txt"}`;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }