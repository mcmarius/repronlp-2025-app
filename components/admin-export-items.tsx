'use client'

import { MouseEvent } from 'react'

interface ExportItemsProps {
  items: string,
  name: string,
}

export default function AdminExportItems(props: ExportItemsProps) {
  let haveDownloadButton = false
  const handleDownload = async ( e: MouseEvent) => {
    if (haveDownloadButton) {
        return
    }
    haveDownloadButton = true
    let fileName = `${props.name}.json`;
    let fileType = 'application/json';
    let jsonString = props.items;
    let blob = new Blob([jsonString], { type: fileType });

    // remove previous button
    const buttonId = `dl-button-${props.name}`
    const old = document.getElementById(buttonId) as HTMLElement;
    if (old) {
      let parent1 = old.parentNode as HTMLElement;
      parent1.removeChild(old);
    }
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.id = buttonId
    a.text = "Download"
    a.className = "btn btn-outline-primary"
    a.download = fileName;
    let parent = (e.target as HTMLElement ).parentNode as HTMLElement;
    parent.appendChild(a);
    // parent.removeChild(e.target as HTMLElement);
    // console.log('clicked')
  }
  return (
    <div>
      <button className="btn btn-outline-primary" onClick={handleDownload}>Export {props.name}</button>
    </div>
  )
}
