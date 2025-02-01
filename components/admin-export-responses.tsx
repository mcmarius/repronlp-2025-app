'use client'

import { MouseEvent } from 'react'
//import { useRouter } from 'next/navigation'
interface ExportResponsesProps {
  responses: string;
}

export default function AdminExportResponses(props: ExportResponsesProps) {
    let haveDownloadButton = false
    const handleDownload = async ( e: MouseEvent) => {
      if (haveDownloadButton) {
          return
      }
      haveDownloadButton = true
      let fileName = 'responses.json';
      let fileType = 'application/json';
      let jsonString = props.responses;
      let blob = new Blob([jsonString], { type: fileType });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.text = "Download"
      a.className = "btn btn-outline-primary"
      a.download = fileName;
      let parent = (e.target as HTMLElement ).parentNode as HTMLElement;
      parent.appendChild(a);
      parent.removeChild(e.target as HTMLElement);
      console.log('clicked')
    }
    return (
    <div>
      <button className="btn btn-outline-primary" onClick={handleDownload}>Export responses</button>
    </div>
    )
}
